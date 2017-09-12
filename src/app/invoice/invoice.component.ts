import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

import { Invoice } from 'koffing/backend/model/invoice';
import { SearchService } from 'koffing/backend/search.service';
import { INVOICE_STATUS } from 'koffing/backend';

@Component({
    templateUrl: 'invoice.component.pug'
})
export class InvoiceComponent implements OnInit {

    public invoice: Invoice;

    private shopID: string;

    private hasProcessedPayment: boolean = false;

    public invoiceNotFound: boolean = false;

    constructor(private searchService: SearchService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    public ngOnInit() {
        Observable.combineLatest(this.route.parent.params, this.route.params)
            .subscribe((result) => {
                this.shopID = result[0].shopID;
                this.searchService.searchInvoices(this.shopID, {
                    fromTime: moment().subtract(1, 'year').startOf('day').toDate(),
                    toTime: moment().endOf('day').toDate(),
                    limit: 1,
                    invoiceID: result[1].invoiceID
                }).subscribe((searchResult) => {
                    if (searchResult.totalCount === 1) {
                        this.invoice = searchResult.result[0];
                    } else {
                        this.invoiceNotFound = true;
                    }
                });
            });
    }

    public onProcessedPayment(processed: boolean) {
        this.hasProcessedPayment = processed;
    }

    public isPaymentLinkAvailable() {
        return this.invoice && this.invoice.status === INVOICE_STATUS.unpaid && !this.hasProcessedPayment;
    }

    public back() {
        this.router.navigate(['shop', this.shopID, 'invoices']);
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Subject } from 'rxjs/Subject';

import { InvoiceService } from 'koffing/backend/invoice.service';
import { Invoice } from 'koffing/backend/model/invoice';
import { SearchParams } from 'koffing/analytics/invoices/search-form/search-params';

@Component({
    templateUrl: './invoices.component.pug'
})
export class InvoicesComponent implements OnInit {

    public invoices: Subject<Invoice[]> = new Subject();
    public isLoading: boolean = false;
    public shopID: string;
    public totalCount: number;
    public offset: number = 0;
    public limit: number = 20;
    public searchParams: SearchParams = {
        fromTime: moment().subtract(1, 'month').hour(0).minute(0).second(0).toDate(),
        toTime: moment().hour(23).minute(59).second(59).toDate()
    };

    constructor(private route: ActivatedRoute,
                private invoiceService: InvoiceService) {
    }

    public ngOnInit() {
        this.route.parent.params.subscribe((params) => {
            this.shopID = params['shopID'];
            this.search();
        });
    }

    public onSearch(searchParams: SearchParams) {
        this.searchParams = searchParams;
        this.search();
    }

    public onChangePage(offset: number) {
        this.offset = offset;
        this.search();
    }

    private search() {
        this.isLoading = true;
        this.invoiceService.getInvoices(
            this.shopID,
            this.searchParams.fromTime,
            this.searchParams.toTime,
            this.limit,
            this.offset,
            this.searchParams.status,
            this.searchParams.invoiceID
        ).subscribe((searchResult) => {
            this.isLoading = false;
            this.totalCount = searchResult.totalCount;
            this.invoices.next(searchResult.invoices);
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Subject } from 'rxjs/Subject';

import { Invoice } from 'koffing/backend/model/invoice';
import { FormSearchParams } from 'koffing/analytics/invoices/search-form/form-search-params';
import { SearchService } from 'koffing/backend/search.service';
import { InvoicesService } from 'koffing/analytics/invoices/invoices.service';

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
    public searchParams: FormSearchParams = {
        invoiceFrom: moment().subtract(1, 'month').hour(0).minute(0).second(0).toDate(),
        invoiceTo: moment().hour(23).minute(59).second(59).toDate(),
        paymentFrom: moment().subtract(1, 'month').hour(0).minute(0).second(0).toDate(),
        paymentTo: moment().hour(23).minute(59).second(59).toDate()
    };

    constructor(private route: ActivatedRoute,
                private searchService: SearchService) {
    }

    public ngOnInit() {
        this.route.parent.params.subscribe((params) => {
            this.shopID = params['shopID'];
            this.search();
        });
    }

    public onSearch(searchParams: FormSearchParams) {
        this.searchParams = searchParams;
        this.search();
    }

    public onChangePage(offset: number) {
        this.offset = offset;
        this.search();
    }

    private search() {
        this.isLoading = true;
        const request = InvoicesService.toSearchParams(this.limit, this.offset, this.searchParams);
        this.searchService.searchInvoices(this.shopID, request).subscribe((result) => {
            this.isLoading = false;
            this.totalCount = result.totalCount;
            this.invoices.next(result.invoices);
        });
    }
}

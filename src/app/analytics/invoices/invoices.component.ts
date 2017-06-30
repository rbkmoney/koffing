import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Subject } from 'rxjs/Subject';

import { Invoice } from 'koffing/backend/model/invoice';
import { FormSearchParams } from 'koffing/analytics/invoices/search-form/form-search-params';
import { SearchService } from 'koffing/backend/services/search.service';
import { InvoicesService } from 'koffing/analytics/invoices/invoices.service';
import { Action } from 'koffing/analytics/invoices/actions/action';

@Component({
    templateUrl: './invoices.component.pug',
    styleUrls: ['invoices.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class InvoicesComponent implements OnInit {

    public invoices: Subject<Invoice[]> = new Subject();
    public isLoading: boolean = false;
    public shopID: string;
    public totalCount: number;
    public offset: number = 0;
    public limit: number = 20;
    public searchParams: FormSearchParams = {
        from: moment().subtract(1, 'month').startOf('day').toDate(),
        to: moment().endOf('day').toDate()
    };
    public activeAction: Action = Action.none;
    public action = Action;

    constructor(private route: ActivatedRoute,
                private searchService: SearchService) {
    }

    public ngOnInit() {
        this.route.parent.params.subscribe((params) => {
            this.shopID = params['shopID'];
            this.search();
        });
    }

    public onAction(action: Action) {
        this.activeAction = action;
    }

    public onSearch(searchParams: FormSearchParams) {
        this.searchParams = searchParams;
        this.offset = 0;
        this.search();
    }

    public onChangePage(offset: number) {
        this.offset = offset;
        this.search();
    }

    public onCreate(invoice: Invoice) {
        this.activeAction = Action.search;
        this.searchParams.invoiceID = invoice.id;
        this.totalCount = 1;
        this.invoices.next([invoice]);
    }

    private search() {
        this.isLoading = true;
        const request = InvoicesService.toSearchParams(this.limit, this.offset, this.searchParams);
        this.searchService.searchInvoices(this.shopID, request).subscribe((response) => {
            this.isLoading = false;
            this.totalCount = response.totalCount;
            this.invoices.next(response.result);
        });
    }
}

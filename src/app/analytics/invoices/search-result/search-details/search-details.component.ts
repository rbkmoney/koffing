import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Payment } from 'koffing/backend/model/payment';
import { Invoice } from 'koffing/backend/model/invoice';
import { FormSearchParams } from 'koffing/analytics/invoices/search-form/form-search-params';
import { SearchService } from 'koffing/backend/search.service';
import { SearchDetailsService } from 'koffing/analytics/invoices/search-result/search-details/search-details.service';

@Component({
    selector: 'kof-search-details',
    templateUrl: './search-details.component.pug'
})
export class SearchDetailsComponent implements OnInit {

    @Input()
    public invoice: Invoice;

    @Input()
    public searchParams: FormSearchParams;

    @Input()
    public shopID: string;

    public payments: Observable<Payment[]>;

    public totalPayments: number;

    constructor(private searchService: SearchService) { }

    public ngOnInit() {
        const request = SearchDetailsService.toSearchParams(3, 0, this.searchParams);
        this.payments = this.searchService.searchPayments(this.shopID, request).do((result) => {
            this.totalPayments = result.totalCount;
        }).map((result) => result.payments);
    }
}

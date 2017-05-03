import { Component, Input, OnInit } from '@angular/core';

import { Invoice } from 'koffing/backend/model/invoice';
import { FormSearchParams } from 'koffing/analytics/invoices/search-form/form-search-params';
import { SearchDetailsService } from 'koffing/analytics/invoices/search-result/search-details/search-details.service';
import { SearchResult } from 'koffing/analytics/invoices/search-result/search-details/search-result';

@Component({
    selector: 'kof-search-details',
    templateUrl: './search-details.component.pug',
    providers: [SearchDetailsService]
})
export class SearchDetailsComponent implements OnInit {

    @Input()
    public invoice: Invoice;

    @Input()
    public searchParams: FormSearchParams;

    @Input()
    public shopID: string;

    public searchResult: SearchResult;

    constructor(private searchDetailsService: SearchDetailsService) {
    }

    public ngOnInit() {
        this.search();
    }

    public search() {
        this.searchDetailsService.search(this.shopID, this.invoice.id, this.searchParams).subscribe((result) => {
            this.searchResult = result;
        });
    }
}

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Invoice } from 'koffing/backend/model/invoice';
import { SearchDetailsService } from './search-details.service';
import { SearchResult } from './search-result';
import { SearchFormService } from 'koffing/invoices/search-form/search-form.service';

@Component({
    selector: 'kof-search-details',
    templateUrl: './search-details.component.pug',
    providers: [SearchDetailsService]
})
export class SearchDetailsComponent implements OnInit {

    @Input()
    public invoice: Invoice;

    public searchResult: SearchResult;

    public isLoading: boolean;

    public searchForm: FormGroup;

    constructor(private searchDetailsService: SearchDetailsService,
                private searchFormService: SearchFormService) {
    }

    public ngOnInit() {
        this.searchForm = this.searchFormService.searchForm;
        this.search();
    }

    public search() {
        this.isLoading = true;
        this.searchDetailsService.search(this.invoice.shopID, this.invoice.id, this.searchForm.value).subscribe((result) => {
            this.isLoading = false;
            this.searchResult = result;
        });
    }

    public isPaymentLinkAvailable() {
        return this.invoice.status === 'unpaid';
    }
}

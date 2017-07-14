import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { clone } from 'lodash';

import { SearchInvoiceTemplatesParams } from 'koffing/backend';

@Component({
    selector: 'kof-search-form-invoice-templates',
    templateUrl: 'search-form-invoice-templates.component.pug'
})
export class SearchFormInvoiceTemplatesComponent implements OnInit {

    @Input()
    public searchInvoiceTemplatesParams: SearchInvoiceTemplatesParams;

    @Input()
    public isSearching: boolean;

    @Output()
    public onSearch: EventEmitter<SearchInvoiceTemplatesParams> = new EventEmitter<SearchInvoiceTemplatesParams>();

    private initParams: SearchInvoiceTemplatesParams;

    public ngOnInit() {
        this.initParams = clone(this.searchInvoiceTemplatesParams);
    }

    public search() {
        this.onSearch.emit(this.searchInvoiceTemplatesParams);
    }

    public reset() {
        this.searchInvoiceTemplatesParams = clone(this.initParams);
        this.search();
    }
}

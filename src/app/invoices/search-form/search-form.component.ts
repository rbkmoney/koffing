import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map } from 'lodash';

import { SelectItem } from 'koffing/common/select/select-item';
import { invoiceStatuses } from '../invoice-statuses';
import { paymentStatuses } from '../payment-statuses';
import { SearchFormService } from './search-form.service';

@Component({
    selector: 'kof-search-form',
    templateUrl: 'search-form.component.pug'
})
export class SearchFormComponent implements OnInit {

    @Input()
    public isSearch: boolean = false;

    @Output()
    public onSearch: EventEmitter<void> = new EventEmitter<void>();

    public searchForm: FormGroup;

    public invoiceStatuses: SelectItem[];

    public paymentStatuses: SelectItem[];

    constructor(private searchFormService: SearchFormService) { }

    public ngOnInit() {
        this.invoiceStatuses = map(invoiceStatuses, (name, key) => new SelectItem(key, name));
        this.paymentStatuses = map(paymentStatuses, (name, key) => new SelectItem(key, name));
        this.searchForm = this.searchFormService.searchForm;
    }

    public search() {
        if (this.searchForm.valid) {
            this.onSearch.emit();
        }
    }

    public reset() {
        this.searchFormService.reset();
        this.search();
    }
}

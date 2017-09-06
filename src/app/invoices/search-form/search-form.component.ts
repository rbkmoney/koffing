import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { map } from 'lodash';

import { SelectItem } from 'koffing/common/select/select-item';
import { invoiceStatuses } from '../invoice-statuses';
import { paymentStatuses } from '../payment-statuses';
import { SearchFormService } from './search-form.service';

@Component({
    selector: 'kof-search-form',
    templateUrl: 'search-form.component.pug',
    styleUrls: ['search-form.component.less'],
    animations: [
        trigger('flyInOut', [
            state('in', style({
                opacity: 1
            })),
            transition('void => *', [
                style({
                    opacity: 0
                }),
                animate('0.1s ease-in')
            ]),
            transition('* => void', [
                animate('0.1s ease-out', style({
                    opacity: 0
                }))
            ])
        ])
    ]
})
export class SearchFormComponent implements OnInit {

    @Output()
    public onSearch: EventEmitter<void> = new EventEmitter<void>();

    public searchForm: FormGroup;

    public invoiceStatuses: SelectItem[];

    public paymentStatuses: SelectItem[];

    public additionalParamsVisible: boolean;

    constructor(private searchFormService: SearchFormService) {}

    public ngOnInit() {
        this.invoiceStatuses = map(invoiceStatuses, (name, key) => new SelectItem(key, name));
        this.paymentStatuses = map(paymentStatuses, (name, key) => new SelectItem(key, name));
        this.searchForm = this.searchFormService.searchForm;
        this.searchForm.valueChanges
            .filter((value) => this.searchForm.status === 'VALID')
            .debounceTime(300)
            .subscribe(() => this.onSearch.emit());
        this.additionalParamsVisible = this.searchFormService.hasFormAdditionalParams();
    }

    public reset() {
        this.searchFormService.reset();
        this.onSearch.emit();
    }

    public toggleAdditionalParamsVisible() {
        this.additionalParamsVisible = !this.additionalParamsVisible;
    }
}

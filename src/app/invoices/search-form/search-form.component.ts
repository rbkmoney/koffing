import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { map } from 'lodash';

import { SelectItem } from 'koffing/common/select/select-item';
import { InvoiceStatusLabel } from '../invoice-status-label';
import { PaymentStatusLabel } from '../payment-status-label';
import { PaymentMethodLabel } from '../payment-method-label';
import { PaymentFlowLabel } from '../payment-flow-label';
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
    public paymentMethods: SelectItem[];
    public paymentFlows: SelectItem[];
    public additionalParamsVisible: boolean;

    constructor(private searchFormService: SearchFormService) {}

    public ngOnInit() {
        this.invoiceStatuses = map(InvoiceStatusLabel, (name, key) => new SelectItem(key, name));
        this.paymentStatuses = map(PaymentStatusLabel, (name, key) => new SelectItem(key, name));
        this.paymentMethods = map(PaymentMethodLabel, (name, key) => new SelectItem(key, name));
        this.paymentFlows = map(PaymentFlowLabel, (name, key) => new SelectItem(key, name));

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

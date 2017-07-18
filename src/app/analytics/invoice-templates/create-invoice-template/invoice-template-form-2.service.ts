import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

import { SelectItem } from 'koffing/common/select/select-item';
import { InvoiceTemplateCostTypes as COST_TYPES } from './invoice-template-cost-types';
import { InvoiceTemplateParams } from 'koffing/backend';

@Injectable()
export class InvoiceTemplateForm2Service {

    public form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.initForm();
        this.form.valueChanges.subscribe((change) => this.setCostGroup(change));
    }

    public getCostTypesItems(): SelectItem[] {
        return [
            {value: COST_TYPES[COST_TYPES.InvoiceTemplateCostFixed], label: 'Фиксированная стоимость'},
            {value: COST_TYPES[COST_TYPES.InvoiceTemplateCostRange], label: 'Диапазон стоимости'}
        ];
    }

    public toInvoiceParams(shopID: string, form: FormGroup): InvoiceTemplateParams {
        // TODO conversion logic here
        return null;
    }

    private setCostGroup(change: any) {
        if (change.selectedCostType === 'InvoiceTemplateCostFixed' && !this.hasCostType('InvoiceTemplateCostFixed')) {
            this.form.setControl('cost', this.getFixedGroup());
        } else if (change.selectedCostType === 'InvoiceTemplateCostRange' && !this.hasCostType('InvoiceTemplateCostRange')) {
            this.form.setControl('cost', this.getRangedGroup());
        } else if (change.selectedCostType === '' && !this.hasCostType('')) {
            this.form.setControl('cost', this.getEmptyGroup());
        }
    }

    private initForm(): FormGroup {
        return this.fb.group({
            product: ['', [
                Validators.required,
                Validators.maxLength(100)
            ]],
            description: ['', [Validators.maxLength(1000)]],
            selectedCostType: '',
            cost: this.getEmptyGroup(),
            lifetime: this.fb.group({
                days: ['', Validators.min(0)],
                month: ['', Validators.min(0)],
                years: ['', Validators.min(0)]
            })
        });
    }

    private hasCostType(type: string): boolean {
        return this.form.value.cost.costType === type;
    }

    private getEmptyGroup(): FormGroup {
        return this.fb.group({
            costType: ''
        });
    }

    private getFixedGroup(): FormGroup {
        return this.fb.group({
            costType: 'InvoiceTemplateCostFixed',
            amount: ['', [Validators.required, Validators.min(0)]]
        });
    }

    private getRangedGroup(): FormGroup {
        return this.fb.group({
            costType: 'InvoiceTemplateCostRange',
            lowerBound: ['', Validators.min(0)],
            upperBound: ['', Validators.min(0)]
        });
    }
}

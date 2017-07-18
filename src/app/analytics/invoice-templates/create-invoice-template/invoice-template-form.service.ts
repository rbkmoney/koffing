import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { round } from 'lodash';

import { SelectItem } from 'koffing/common/select/select-item';
import { LifetimeInterval } from 'koffing/backend';
import { InvoiceTemplateCostRange } from 'koffing/backend';
import { InvoiceTemplateCostFixed } from 'koffing/backend';
import { InvoiceTemplateParams } from 'koffing/backend';
import { InvoiceTemplateFormParams } from './invoice-template-form-params';
import { InvoiceTemplateCostTypes as COST_TYPES } from './invoice-template-cost-types';

@Injectable()
export class InvoiceTemplateFormService {

    public static toSearchParamsFromFormParams(formParams: InvoiceTemplateFormParams, shopID?: string): InvoiceTemplateParams {
        const params = new InvoiceTemplateParams();
        if (shopID) {
            params.shopID = shopID;
        }
        params.product = formParams.product || '';
        params.description = formParams.description || '';
        params.lifetime = new LifetimeInterval();
        params.lifetime.days = formParams.lifetimeDays || 0;
        params.lifetime.months = formParams.lifetimeMonths || 0;
        params.lifetime.years = formParams.lifetimeYears || 0;
        if (formParams.costType) {
            let cost;
            if (formParams.costType === COST_TYPES[COST_TYPES.InvoiceTemplateCostFixed]) {
                cost = new InvoiceTemplateCostFixed();
                cost.amount = round(formParams.costAmount * 100);
            } else
            if (formParams.costType === COST_TYPES[COST_TYPES.InvoiceTemplateCostRange]) {
                cost = new InvoiceTemplateCostRange();
                cost.range.lowerBound = round(formParams.costLowerBound * 100);
                cost.range.upperBound = round(formParams.costUpperBound * 100);
            }
            cost.currency = 'RUB';
            params.cost = cost;
        }
        return params;
    }

    public static getCostTypesItems(): SelectItem[] {
        return [
            { value: COST_TYPES[COST_TYPES.InvoiceTemplateCostFixed], label: 'Фиксированная стоимость' },
            { value: COST_TYPES[COST_TYPES.InvoiceTemplateCostRange], label: 'Диапазон стоимости' }
        ];
    }

    public form: FormGroup;

    constructor(
        private fb: FormBuilder
    ) { }

    public initForm(): FormGroup {
        this.form = this.fb.group({
            product: ['', [
                Validators.required,
                Validators.maxLength(100)
            ]],
            description: ['', [
                Validators.maxLength(1000)
            ]],
            lifetimeDays: null,
            lifetimeMonths: null,
            lifetimeYears: null,
            costType: '',
            costAmount: null,
            costLowerBound: null,
            costUpperBound: null,
        });
        return this.form;
    }

    public subscribeCostTypeChanges() {
        const formControls = this.form.controls;
        const changeCostType$ = formControls.costType.valueChanges;
        changeCostType$.subscribe((costType: any) => {
            formControls.costAmount.setValidators(null);
            formControls.costLowerBound.setValidators(null);
            formControls.costUpperBound.setValidators(null);
            switch (costType) {
                case COST_TYPES[COST_TYPES.InvoiceTemplateCostFixed]: {
                    formControls.costAmount.setValidators([Validators.required]);
                    break;
                }
                case COST_TYPES[COST_TYPES.InvoiceTemplateCostRange]: {
                    formControls.costLowerBound.setValidators([Validators.required]);
                    formControls.costUpperBound.setValidators([Validators.required]);
                    break;
                }
            }
            formControls.costAmount.updateValueAndValidity();
            formControls.costLowerBound.updateValueAndValidity();
            formControls.costUpperBound.updateValueAndValidity();
        });
    }
}

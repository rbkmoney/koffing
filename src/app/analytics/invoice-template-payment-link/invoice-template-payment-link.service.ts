import { round } from 'lodash';

import {
    LifetimeInterval, InvoiceTemplateCostFixed, InvoiceTemplateCostRange, InvoiceTemplateCostUnlim,
    CostAmountRange
} from 'koffing/backend';
import { InvoiceTemplateParams } from 'koffing/backend/requests/invoice-template-params';
import { COST_TYPES } from '../invoice-template-form/invoice-template-cost-types';

export class InvoiceTemplatePaymentLinkService {

    public static toInvoiceTemplateParams(formValue: any, shopID?: string): InvoiceTemplateParams {
        const params = new InvoiceTemplateParams();
        if (shopID) {
            params.shopID = shopID;
        }
        if (formValue.product) {
            params.product = formValue.product;
        }
        if (formValue.description) {
            params.description = formValue.description;
        }
        params.lifetime = new LifetimeInterval(formValue.lifetime.days, formValue.lifetime.months, formValue.lifetime.years);
        if (formValue.selectedCostType) {
            let cost;
            const currency = 'RUB';
            if (formValue.selectedCostType === COST_TYPES.unlim) {
                cost = new InvoiceTemplateCostUnlim();
            } else
            if (formValue.selectedCostType === COST_TYPES.fixed) {
                const amount = round(formValue.cost.amount * 100);
                cost = new InvoiceTemplateCostFixed(amount, currency);
            } else
            if (formValue.selectedCostType === COST_TYPES.range) {
                const lowerBound = round(formValue.cost.lowerBound * 100);
                const upperBound = round(formValue.cost.upperBound * 100);
                const range = new CostAmountRange(lowerBound, upperBound);
                cost = new InvoiceTemplateCostRange(range, currency);
            }
            params.cost = cost;
        }
        return params;
    }
}

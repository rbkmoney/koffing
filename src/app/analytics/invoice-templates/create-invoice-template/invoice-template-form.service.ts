import { round } from 'lodash';

import { SelectItem } from 'koffing/common/select/select-item';
import { LifetimeInterval } from 'koffing/backend/model/lifetime-interval';
import { InvoiceTemplateCostRange } from 'koffing/backend/model/invoice-template-cost-range';
import { InvoiceTemplateCostFixed } from 'koffing/backend/model/invoice-template-cost-fixed';
import { InvoiceTemplateParams } from 'koffing/backend/requests/invoice-template-params';
import { InvoiceTemplateFormParams } from './invoice-template-form-params';
import { InvoiceTemplateCostTypes as COST_TYPES } from './invoice-template-cost-types';

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
}

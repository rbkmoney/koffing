import { Component, OnInit, Input } from '@angular/core';
import { divide } from 'lodash';

import { SelectItem } from 'koffing/common/select/select-item';
import { InvoiceTemplate } from 'koffing/backend';
import { InvoiceTemplateService } from 'koffing/backend';
import { InvoiceTemplateCostFixed } from 'koffing/backend';
import { InvoiceTemplateCostRange } from 'koffing/backend';
import { SearchInvoiceTemplatesBroadcaster } from 'koffing/broadcaster';
import { InvoiceTemplateCostTypes as COST_TYPES } from '../create-invoice-template/invoice-template-cost-types';
import { InvoiceTemplateFormParams } from '../create-invoice-template/invoice-template-form-params';
import { InvoiceTemplateFormService } from '../create-invoice-template/invoice-template-form.service';

@Component({
    selector: 'kof-update-invoice-template',
    templateUrl: 'update-invoice-template.component.pug'
})
export class UpdateInvoiceTemplateComponent implements OnInit {

    @Input()
    public invoiceTemplate: InvoiceTemplate;

    public formParams: InvoiceTemplateFormParams;
    public costTypesItems: SelectItem[] = [];

    constructor(
        private invoiceTemplateService: InvoiceTemplateService,
        private searchInvoiceTemplatesBroadcaster: SearchInvoiceTemplatesBroadcaster,
    ) { }

    public ngOnInit() {
        this.formParams = this.initFormParams(this.invoiceTemplate);
        this.costTypesItems = InvoiceTemplateFormService.getCostTypesItems();
    }

    public updateInvoiceTemplate() {
        const params = InvoiceTemplateFormService.toSearchParamsFromFormParams(this.formParams);
        this.invoiceTemplateService.updateInvoiceTemplate(this.invoiceTemplate.id, params).subscribe(() => {
            this.searchInvoiceTemplatesBroadcaster.fire();
        });
    }

    private initFormParams(invoiceTemplate: InvoiceTemplate): InvoiceTemplateFormParams {
        const formParams = new InvoiceTemplateFormParams();
        formParams.product = invoiceTemplate.product;
        formParams.description = invoiceTemplate.description;
        formParams.lifetimeDays = invoiceTemplate.lifetime.days;
        formParams.lifetimeMonths = invoiceTemplate.lifetime.months;
        formParams.lifetimeYears = invoiceTemplate.lifetime.years;
        if (invoiceTemplate.cost) {
            formParams.costType = invoiceTemplate.cost.invoiceTemplateCostType;
            if (formParams.costType === COST_TYPES[COST_TYPES.InvoiceTemplateCostFixed]) {
                const cost = invoiceTemplate.cost as InvoiceTemplateCostFixed;
                formParams.costAmount = divide(cost.amount, 100);
            } else
            if (formParams.costType === COST_TYPES[COST_TYPES.InvoiceTemplateCostRange]) {
                const cost = invoiceTemplate.cost as InvoiceTemplateCostRange;
                formParams.costLowerBound = divide(cost.range.lowerBound, 100);
                formParams.costUpperBound = divide(cost.range.upperBound, 100);
            }
        }
        return formParams;
    }
}

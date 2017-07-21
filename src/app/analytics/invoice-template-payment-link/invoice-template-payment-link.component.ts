import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { round } from 'lodash';

import { InvoiceTemplateService } from 'koffing/backend/invoice-template.service';
import { InvoiceTemplateParams } from 'koffing/backend/requests/invoice-template-params';
import { InvoiceTemplateCostFixed, InvoiceTemplateCostRange, LifetimeInterval} from 'koffing/backend';
import { COST_TYPES } from '../invoice-template-form/invoice-template-cost-types';
import { InvoiceTemplateFormService } from '../invoice-template-form/invoice-template-form.service';
import { CheckoutConfigFormService } from '../checkout-config-form/checkout-config-form.service';
import { PaymentLinkService } from '../payment-link/payment-link.service';
import { PaymentLinkInvoiceTemplate } from '../payment-link/payment-link-invoice-template';

@Component({
    selector: 'kof-invoice-template-payment-link',
    templateUrl: './invoice-template-payment-link.component.pug',
    providers: [ InvoiceTemplateService, PaymentLinkService ],
    styles: [`.form-control {height: 30px;}`]
})
export class InvoiceTemplatePaymentLinkComponent implements OnInit {

    @Input()
    public shopID: string;

    @ViewChild('paymentLinkInput')
    public paymentLinkInput: ElementRef;

    public checkoutConfigForm: FormGroup;
    public invoiceTemplateForm: FormGroup;
    public paymentLink: string;
    public isCreated: boolean;
    public invoiceTemplateID: string;
    public invoiceTemplateAccessToken: string;

    constructor(
        private invoiceTemplateService: InvoiceTemplateService,
        private invoiceTemplateFormService: InvoiceTemplateFormService,
        private checkoutConfigFormService: CheckoutConfigFormService,
        private paymentLinkService: PaymentLinkService
    ) {}

    public ngOnInit() {
        this.invoiceTemplateForm = this.invoiceTemplateFormService.form;
        this.checkoutConfigForm = this.checkoutConfigFormService.form;
        this.checkoutConfigForm.valueChanges.subscribe((formValue) => {
            const accessData = new PaymentLinkInvoiceTemplate(this.invoiceTemplateID, this.invoiceTemplateAccessToken);
            this.paymentLink = this.paymentLinkService.getPaymentLink(formValue, accessData);
        });
    }

    public resetForms() {
        this.isCreated = false;
        this.checkoutConfigForm.reset();
        this.invoiceTemplateForm.reset();
        this.invoiceTemplateForm.enable();
    }

    public copy() {
        this.paymentLinkInput.nativeElement.select();
        document.execCommand('copy');
    }

    public createInvoiceTemplate() {
        const params = this.toInvoiceTemplateParams(this.invoiceTemplateForm.value, this.shopID);
        this.invoiceTemplateService.createInvoiceTemplate(params).subscribe((response) => {
            this.isCreated = true;
            this.invoiceTemplateForm.disable();
            this.invoiceTemplateID = response.invoiceTemplate.id;
            this.invoiceTemplateAccessToken = response.invoiceTemplateAccessToken.payload;
            const accessData = new PaymentLinkInvoiceTemplate(this.invoiceTemplateID, this.invoiceTemplateAccessToken);
            this.paymentLink = this.paymentLinkService.getPaymentLink(this.checkoutConfigForm.value, accessData);
        });
    }

    private toInvoiceTemplateParams(formValue: any, shopID?: string): InvoiceTemplateParams {
        const params = new InvoiceTemplateParams();
        if (shopID) {
            params.shopID = shopID;
        }
        params.product = formValue.product || '';
        params.description = formValue.description || '';
        params.lifetime = new LifetimeInterval(formValue.lifetime.days, formValue.lifetime.months, formValue.lifetime.years);
        if (formValue.selectedCostType) {
            let cost;
            if (formValue.selectedCostType === COST_TYPES.Fixed) {
                cost = new InvoiceTemplateCostFixed();
                cost.amount = round(formValue.cost.amount * 100);
            } else
            if (formValue.selectedCostType === COST_TYPES.Range) {
                cost = new InvoiceTemplateCostRange();
                cost.range.lowerBound = round(formValue.cost.lowerBound * 100);
                cost.range.upperBound = round(formValue.cost.upperBound * 100);
            }
            cost.currency = 'RUB';
            params.cost = cost;
        }
        return params;
    }
}

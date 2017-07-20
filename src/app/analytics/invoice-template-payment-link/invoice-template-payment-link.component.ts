import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { chain, round } from 'lodash';

import { ConfigService } from 'koffing/backend/config.service';
import { InvoiceTemplateService } from 'koffing/backend/invoice-template.service';
import { PaymentLinkArguments } from 'koffing/analytics/invoices/search-result/payment-link/payment-link-arguments';
import { CheckoutConfigFormService } from '../payment-link/checkout-config-form.service';
import { InvoiceTemplateFormService } from '../payment-link/invoice-template-form.service';
import { InvoiceTemplateParams } from 'koffing/backend/requests/invoice-template-params';
import {
    InvoiceTemplateCost, InvoiceTemplateCostFixed, InvoiceTemplateCostRange,
    LifetimeInterval
} from 'koffing/backend';
import { COST_TYPES } from '../payment-link/invoice-template-cost-types';

@Component({
    selector: 'kof-invoice-template-payment-link',
    templateUrl: './invoice-template-payment-link.component.pug',
    providers: [ InvoiceTemplateService ],
    styles: [`.form-control {height: 30px;}`]
})
export class InvoiceTemplatePaymentLinkComponent implements OnInit {

    @Input()
    public shopID: string;

    @ViewChild('paymentLinkInput')
    public paymentLinkInput: ElementRef;

    public checkoutConfigForm: FormGroup;
    public invoiceTemplateForm: FormGroup;
    public params: InvoiceTemplateParams;
    public paymentLinkArguments: PaymentLinkArguments;
    public paymentLink: string;
    public isCreated: boolean = false;

    constructor(
        private configService: ConfigService,
        private invoiceTemplateService: InvoiceTemplateService,
        private invoiceTemplateFormService: InvoiceTemplateFormService,
        private checkoutConfigFormService: CheckoutConfigFormService,
    ) {}

    public ngOnInit() {
        this.checkoutConfigForm = this.checkoutConfigFormService.form;
        this.invoiceTemplateForm = this.invoiceTemplateFormService.form;
    }

    public resetForms() {
        this.isCreated = false;
        this.checkoutConfigForm.reset();
        this.invoiceTemplateForm.reset();
        this.invoiceTemplateForm.enable();
    }

    public createInvoiceTemplate() {
        const params = this.toSearchParams(this.invoiceTemplateForm.value, this.shopID);
        this.invoiceTemplateService.createInvoiceTemplate(params).subscribe((response) => {
            console.log(response);
            this.isCreated = true;
            this.invoiceTemplateForm.disable();
            // this.createPaymentLink();
        });
    }

    public toSearchParams(form: any, shopID?: string): InvoiceTemplateParams {
        const params = new InvoiceTemplateParams();
        if (shopID) {
            params.shopID = shopID;
        }
        params.product = form.product || '';
        params.description = form.description || '';
        params.lifetime = new LifetimeInterval(form.lifetime.days, form.lifetime.months, form.lifetime.years);
        if (form.selectedCostType) {
            let cost;
            if (form.selectedCostType === COST_TYPES.Fixed) {
                cost = new InvoiceTemplateCostFixed();
                cost.amount = round(form.cost.amount * 100);
            } else
            if (form.selectedCostType === COST_TYPES.Range) {
                cost = new InvoiceTemplateCostRange();
                cost.range.lowerBound = round(form.cost.lowerBound * 100);
                cost.range.upperBound = round(form.cost.upperBound * 100);
            }
            cost.currency = 'RUB';
            params.cost = cost;
        }
        return params;
    }

    public createPaymentLink() {
        const paymentLinkArguments = chain(this.paymentLinkArguments)
            .map((value: string | boolean | number, key: string) => `${key}=${encodeURIComponent(String(value))}`)
            .join('&')
            .value();
        this.paymentLink = `${this.configService.checkoutUrl}/html/payframe.html?${paymentLinkArguments}`;
    }

    public copy() {
        // console.log(this.invoiceTemplateForm.value);
        // console.log(this.invoiceTemplateForm.status);
        // console.log(this.invoiceTemplateForm.valid);
        //
        // console.log(this.checkoutConfigForm.value);
        // console.log(this.checkoutConfigForm.status);

        // this.paymentLinkInput.nativeElement.select();
        // document.execCommand('copy');
    }
}

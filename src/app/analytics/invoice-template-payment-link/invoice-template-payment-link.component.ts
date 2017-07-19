import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { chain } from 'lodash';

import { ConfigService } from 'koffing/backend/config.service';
import { InvoiceTemplateService } from 'koffing/backend/invoice-template.service';
import { PaymentLinkArguments } from "koffing/analytics/invoices/search-result/payment-link/payment-link-arguments";

@Component({
    selector: 'kof-invoice-template-payment-link',
    templateUrl: './invoice-template-payment-link.component.pug',
    providers: [ InvoiceTemplateService ],
    styles: [`input.form-control { height: 30px }`]
})
export class InvoiceTemplatePaymentLinkComponent implements OnInit {

    @ViewChild('paymentLinkInput')
    public paymentLinkInput: ElementRef;

    public paymentLinkArguments: PaymentLinkArguments;
    public paymentLink: string;

    constructor(
        private configService: ConfigService,
        private invoiceTemplateService: InvoiceTemplateService
    ) {}

    public ngOnInit() {
        this.paymentLinkArguments = new PaymentLinkArguments();
        // this.isLoading = true;
        // this.invoiceTemplateService.createInvoiceAccessToken(this.invoiceID).subscribe((response) => {
        //     this.paymentLinkArguments.invoiceID = this.invoiceID;
        //     this.paymentLinkArguments.popupMode = true;
        //     this.paymentLinkArguments.invoiceAccessToken = response.payload;
        //     this.createPaymentLink();
        //     this.isLoading = false;
        // });
    }

    public createPaymentLink() {
        const paymentLinkArguments = chain(this.paymentLinkArguments)
            .map((value: string | boolean | number, key: string) => `${key}=${encodeURIComponent(String(value))}`)
            .join('&')
            .value();
        this.paymentLink = `${this.configService.checkoutUrl}/html/payframe.html?${paymentLinkArguments}`;
    }

    public copy() {
        this.paymentLinkInput.nativeElement.select();
        document.execCommand('copy');
    }
}

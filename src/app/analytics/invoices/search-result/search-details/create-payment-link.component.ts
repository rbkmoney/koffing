import { Component, Input, OnInit } from '@angular/core';
import { chain } from 'lodash';

import { ConfigService } from 'koffing/backend/services/config.service';
import { InvoiceService } from 'koffing/backend/invoice.service';
import { PaymentLinkArguments } from './payment-link-arguments';

@Component({
    selector: 'kof-create-payment-link',
    templateUrl: './create-payment-link.component.pug',
    styles: [` textarea { resize: vertical } input.form-control { height: 30px }`]
})
export class CreatePaymentLinkComponent implements OnInit {

    @Input()
    public invoiceID: string;

    public paymentLinkArguments: PaymentLinkArguments;
    public paymentLink: string;
    public isLoading: boolean;

    constructor(
        private configService: ConfigService,
        private invoiceService: InvoiceService
    ) {}

    public ngOnInit() {
        this.isLoading = true;
        this.invoiceService.createInvoiceAccessToken(this.invoiceID).subscribe((response) => {
            this.paymentLinkArguments = new PaymentLinkArguments();
            this.paymentLinkArguments.invoiceID = this.invoiceID;
            this.paymentLinkArguments.invoiceAccessToken = response.payload;
            this.paymentLinkArguments.popupMode = true;
            this.createPaymentLink();
            this.isLoading = false;
        });
    }

    public createPaymentLink() {
        const paymentLinkArguments = chain(this.paymentLinkArguments)
            .map((value: string | boolean | number, key: string) => `${key}=${encodeURI(String(value))}`)
            .join('&')
            .value();

        this.paymentLink = `${this.configService.checkoutUrl}/html/payframe.html?${paymentLinkArguments}`;
    }
}

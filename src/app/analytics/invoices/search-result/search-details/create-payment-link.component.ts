import { Component, Input, OnInit } from '@angular/core';
import { chain } from 'lodash';

import { ConfigService } from 'koffing/backend/services/config.service';
import { InvoiceService } from 'koffing/backend/invoice.service';
import { PaymentLinkArguments } from './payment-link-arguments';

@Component({
    selector: 'kof-create-payment-link',
    templateUrl: './create-payment-link.component.pug'
})
export class CreatePaymentLinkComponent implements OnInit {

    @Input()
    public invoiceID: string;

    @Input()
    public productDescription: string;

    public paymentLinkArguments: PaymentLinkArguments;
    public paymentLink: string;
    public isLoading: boolean;

    constructor(
        private configService: ConfigService,
        private invoiceService: InvoiceService
    ) {}

    public ngOnInit() {
        this.paymentLinkArguments = new PaymentLinkArguments();
        this.paymentLinkArguments.invoiceID = this.invoiceID;
        this.paymentLinkArguments.description = this.productDescription;
        this.paymentLinkArguments.popupMode = true;

        this.isLoading = true;
        this.invoiceService.createInvoiceAccessToken(this.invoiceID).subscribe((response) => {
            this.paymentLinkArguments.invoiceAccessToken = response.payload;
            this.isLoading = false;
        });
    }

    public createPaymentLink(event: Event) {
        event.stopPropagation();

        const paymentLinkArguments = chain(this.paymentLinkArguments)
            .map((value: string | boolean | number, key: string) => `${key}=${encodeURI(String(value))}`)
            .join('&')
            .value();

        this.paymentLink = `${this.configService.checkoutUrl}/html/payframe.html?${paymentLinkArguments}`;
    }
}

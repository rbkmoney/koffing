import { Injectable } from '@angular/core';
import { chain } from 'lodash';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from 'koffing/backend/config.service';
import { PaymentLinkArguments } from './payment-link-arguments';
import { UrlShortenerService } from 'koffing/backend/url-shortener.service';
import { Invoice } from 'koffing/backend/model/invoice';
import { InvoiceService } from 'koffing/backend/invoice.service';

@Injectable()
export class PaymentLinkService {

    constructor(private configService: ConfigService,
                private urlShortenerService: UrlShortenerService,
                private invoiceService: InvoiceService) {
    }

    public getInvoicePaymentLink(invoice: Invoice, formValue: any): Observable<string> {
        return this.createInvoiceAccessToken(invoice.id)
            .map((accessToken) => this.prepareInvoiceUrl(formValue, invoice, accessToken))
            .switchMap((url) => this.urlShortenerService.shorten(url))
            .map((response) => `${this.configService.shortenUrlEndpoint}/${response.sid}`);
    }

    private prepareInvoiceUrl(formValue: any, invoice: Invoice, accessToken: string): string {
        const paymentLinkArguments = this.toPaymentLinkArguments(formValue, invoice.shopID, invoice.id, accessToken);
        const args = chain(paymentLinkArguments)
            .map((value: any, key: string) => `${key}=${encodeURIComponent(String(value))}`)
            .join('&')
            .value();
        return `${this.configService.checkoutUrl}/html/payframe.html?${args}`;
    }

    private toPaymentLinkArguments(formValue: any, shopID: string, invoiceID: string, accessToken: string): PaymentLinkArguments {
        const args = new PaymentLinkArguments();
        args.name = formValue.name || '';
        args.description = formValue.description || '';
        args.payButtonLabel = formValue.payButtonLabel || '';
        args.logo = formValue.logo || '';
        args.email = formValue.email || '';
        args.redirectUrl = formValue.redirectUrl || '';
        args.popupMode = true;
        if (formValue.paymentFlowHold) {
            args.paymentFlowHold = formValue.paymentFlowHold;
            args.holdExpiration = formValue.holdExpiration;
        }
        // TODO fix after real apple pay payments api capability
        if (shopID === 'TEST') {
            args.applePayTest = true;
        }
        args.invoiceID = invoiceID;
        args.invoiceAccessToken = accessToken;
        // if (accessData instanceof PaymentLinkInvoice) {
        //     args.invoiceID = accessData.invoiceID || '';
        //     args.invoiceAccessToken = accessData.invoiceAccessToken || '';
        // }
        // if (accessData instanceof PaymentLinkInvoiceTemplate) {
        //     args.invoiceTemplateID = accessData.invoiceTemplateID || '';
        //     args.invoiceTemplateAccessToken = accessData.invoiceTemplateAccessToken || '';
        // }
        return args;
    }

    private createInvoiceAccessToken(invoiceID: string): Observable<string> {
        return this.invoiceService.createInvoiceAccessToken(invoiceID).map((response) => response.payload);
    }
}

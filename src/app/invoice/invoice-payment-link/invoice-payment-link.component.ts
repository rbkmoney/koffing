import { Component, ElementRef, Input, ViewChild } from '@angular/core';

import { InvoiceService } from 'koffing/backend/invoice.service';
import { Invoice } from 'koffing/backend/model/invoice';

@Component({
    selector: 'kof-invoice-payment-link',
    templateUrl: 'invoice-payment-link.component.pug',
    styles: [`.form-control {height: 30px;}`]
})
export class InvoicePaymentLinkComponent {

    @Input()
    public invoice: Invoice;

    @ViewChild('paymentLinkInput')
    public paymentLinkInput: ElementRef;

    // public checkoutConfigForm: FormGroup;
    public paymentLink: string;
    public invoiceAccessToken: string;
    public paymentLinkVisible: boolean = false;

    constructor(private invoiceService: InvoiceService) {
    }

    public copy() {
        this.paymentLinkInput.nativeElement.select();
        document.execCommand('copy');
    }

    public generatePaymentLink() {
    }

    private createInvoiceAccessToken() {
        this.invoiceService.createInvoiceAccessToken(this.invoice.id).subscribe((response) => {
            this.invoiceAccessToken = response.payload;
        });
    }
}

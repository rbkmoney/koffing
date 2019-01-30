import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Invoice } from 'koffing/backend/model/invoice';
import { CheckoutConfigFormService } from 'koffing/checkout/checkout-config-form/checkout-config-form.service';
import { PaymentLinkService } from 'koffing/checkout/payment-link/payment-link.service';
import { InvoiceService } from 'koffing/backend/invoice.service';
import { PaymentMethod } from 'koffing/backend/model/payment-method/payment-method';
import { copy } from 'koffing/common/copy';

@Component({
    selector: 'kof-invoice-payment-link',
    templateUrl: 'invoice-payment-link.component.pug'
})
export class InvoicePaymentLinkComponent implements OnInit {
    @Input()
    public invoice: Invoice;

    @ViewChild('paymentLinkInput')
    public paymentLinkInput: ElementRef;

    public checkoutConfigForm: FormGroup;
    public paymentLink: string;
    public paymentLinkVisible: boolean = false;
    public methods: PaymentMethod[];

    constructor(
        private checkoutConfigFormService: CheckoutConfigFormService,
        private paymentLinkService: PaymentLinkService,
        private invoiceService: InvoiceService
    ) {}

    public ngOnInit() {
        this.checkoutConfigForm = this.checkoutConfigFormService.form;
        this.checkoutConfigForm.valueChanges.subscribe(() => (this.paymentLinkVisible = false));
        this.invoiceService.getInvoicePaymentMethods(this.invoice.id).subscribe(methods => {
            this.methods = methods;
        });
    }

    public copy() {
        copy(this.paymentLinkInput.nativeElement);
    }

    public generatePaymentLink() {
        const value = this.checkoutConfigForm.getRawValue();
        this.paymentLinkService
            .getInvoicePaymentLink(this.invoice, value)
            .subscribe(paymentLink => {
                this.paymentLink = paymentLink;
                this.paymentLinkVisible = true;
            });
    }
}

import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { EventPollerService } from 'koffing/common/event-poller.service';
import { Invoice, RefundParams } from 'koffing/backend';
import { InvoiceService } from 'koffing/backend/invoice.service';
import { FormGroup } from '@angular/forms';
import { PaymentRefundService } from './payment-refund.service';
import { RefundStatusChanged } from 'koffing/backend/model/event/refund-status.changed';
import { REFUND_STATUS } from 'koffing/backend/constants/refund-status';

@Component({
    selector: 'kof-payment-refund',
    templateUrl: 'payment-refund.component.pug'
})
export class PaymentRefundComponent implements OnInit, AfterViewInit {

    @Input()
    public invoice: Invoice;

    @Input()
    public paymentID: string;

    @Output()
    public onRefund: EventEmitter<void> = new EventEmitter();

    public form: FormGroup;

    public inProcess: boolean = false;
    private modalElement: any;

    constructor(
        private eventPollerService: EventPollerService,
        private invoiceService: InvoiceService,
        private paymentRefundService: PaymentRefundService
    ) { }

    public ngOnInit() {
        this.form = this.paymentRefundService.initForm(this.invoice.amount);
    }

    public ngAfterViewInit() {
        this.modalElement = jQuery(`#${this.paymentID}refund`);
    }

    public close() {
        this.modalElement.modal('hide');
    }

    public refundPayment() {
        this.inProcess = true;
        const refundParams = {
            reason: this.form.value.reason,
            amount: this.form.value.amount * 100,
            currency: this.form.value.amount ? 'RUB' : null // TODO: убрать хардкод валюты когда это станет возможным
        } as RefundParams;
        this.invoiceService.refundPayment(this.invoice.id, this.paymentID, refundParams).subscribe((refund) => {
            const expectedChange = new RefundStatusChanged(REFUND_STATUS.succeeded, this.paymentID, refund.id);
            this.eventPollerService.startPolling(this.invoice.id, expectedChange).subscribe(() => {
                this.inProcess = false;
                this.onRefund.emit();
                this.close();
            });
        });
    }
}

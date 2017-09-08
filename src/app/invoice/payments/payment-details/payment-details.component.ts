import { Component, Input } from '@angular/core';

import { Payment } from 'koffing/backend/model/payment';
import { PAYMENT_STATUS } from 'koffing/backend';

@Component({
    selector: 'kof-payment-details',
    templateUrl: 'payment-details.component.pug'
})
export class PaymentDetailsComponent {

    @Input()
    public payment: Payment;

    public getLabelClass(status: string) {
        return {
            'label-success': status === PAYMENT_STATUS.captured,
            'label-danger': status === PAYMENT_STATUS.failed
        };
    }
}

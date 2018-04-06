import {Component, Input, OnChanges} from '@angular/core';
import {get} from 'lodash';

import {Payment} from 'koffing/backend/model/payment/payment';
import {CustomerService} from 'koffing/backend/customer.service';
import {PAYMENT_STATUS, Customer, CustomerPayer, PaymentError} from 'koffing/backend';
import * as errors from './errors.json';

@Component({
    selector: 'kof-payment-details',
    templateUrl: 'payment-details.component.pug'
})
export class PaymentDetailsComponent implements OnChanges {

    @Input()
    public payment: Payment;

    public customer: Customer;

    constructor(private customerService: CustomerService) {
    }

    public ngOnChanges() {
        if (this.payment && this.payment.payer.payerType === 'CustomerPayer') {
            const payer = this.payment.payer as CustomerPayer;
            this.customerService.getCustomerById(payer.customerID)
                .subscribe((customer) => this.customer = customer);
        }
    }

    public isFlowInformationAvailable(payment: Payment) {
        return payment.flow.type === 'PaymentFlowHold' && this.payment.status === PAYMENT_STATUS.processed;
    }

    public getLabelClass(status: string) {
        return {
            'label-success': status === PAYMENT_STATUS.captured,
            'label-danger': status === PAYMENT_STATUS.failed
        };
    }

    public mapError(paymentError: PaymentError) {
        const path = this.getPath(paymentError);
        return get(errors, path, 'Неизвестная ошибка');
    }

    private getPath(error: PaymentError): string {
        let path;
        path = error.subError ? `${error.code}.${this.getPath(error.subError)}` : error.code;
        if (error.subError) {
            this.getPath(error.subError);
        }
        return path;
    }
}

import { Pipe, PipeTransform } from '@angular/core';
import { PaymentStatusLabel } from 'koffing/invoices/payment-status-label';

@Pipe({
    name: 'kofPaymentStatus'
})
export class PaymentStatusPipe implements PipeTransform {

    public transform(input: string): string {
        const status = PaymentStatusLabel[input];
        return status ? status : input;
    }
}

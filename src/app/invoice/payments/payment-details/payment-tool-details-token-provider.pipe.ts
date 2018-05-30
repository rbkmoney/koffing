import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'kofPaymentToolDetailsTokenProvider'
})
export class PaymentToolDetailsTokenProviderPipe implements PipeTransform {

    private names = {
        applepay: 'Apple pay',
        googlepay: 'Google pay',
        samsungpay: 'Samsung pay'
    };

    public transform(input: string): string {
        const status = this.names[input];
        return status ? status : input;
    }
}

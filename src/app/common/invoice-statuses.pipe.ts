import { Pipe, PipeTransform } from '@angular/core';

import { InvoiceStatusLabel } from 'koffing/invoices/invoice-status-label';

@Pipe({
    name: 'kofInvoiceStatus'
})
export class InvoiceStatusPipe implements PipeTransform {

    public transform(input: string): string {
        const status = InvoiceStatusLabel[input];
        return status ? status : input;
    }
}

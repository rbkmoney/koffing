import { round, map } from 'lodash';
import * as moment from 'moment';

import { InvoiceParams } from 'koffing/backend/requests/invoice-params';
import { InvoiceLine } from 'koffing/backend/model/invoice-cart/invoice-line';
import { INVOICE_TYPES } from '../invoice-form/invoice-types';

export class CreateInvoiceService {

    public static toInvoiceParams(formValue: any, shopID: string): InvoiceParams {
        const params = new InvoiceParams();
        params.shopID = shopID;
        params.product = formValue.product;
        params.currency = 'RUB';
        params.dueDate = moment(formValue.dueDate).utc().format();
        params.description = formValue.description;
        params.metadata = {};
        if (formValue.selectedInvoiceType === INVOICE_TYPES.fixed) {
            params.amount = this.toMinor(formValue.amount);
        } else if (formValue.selectedInvoiceType === INVOICE_TYPES.cart) {
            params.amount = this.toMinor(formValue.cartAmount);
            params.cart = map(formValue.cart, (invoiceLine: InvoiceLine) => {
                invoiceLine.price = this.toMinor(invoiceLine.price);
                return invoiceLine;
            });
        }
        return params;
    }

    private static toMinor(value: number): number {
        return round(value * 100);
    }
}

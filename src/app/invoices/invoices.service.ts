import { Injectable } from '@angular/core';

import { SearchInvoicesParams } from 'koffing/backend/requests/search-invoices-params';

@Injectable()
export class InvoicesService {

    public toSearchParams(limit: number, offset: number, formParams: any): SearchInvoicesParams {
        const result = new SearchInvoicesParams();
        result.limit = limit;
        result.offset = offset;
        result.fromTime = formParams.from;
        result.toTime = formParams.to;
        result.invoiceID = formParams.invoiceID;
        result.invoiceStatus = formParams.invoiceStatus;
        result.paymentID = formParams.isHideEmpty ? '1' : '';
        result.paymentStatus = formParams.paymentStatus;
        result.paymentMethod = formParams.paymentMethod;
        result.paymentFlow = formParams.paymentFlow;
        result.payerIP = formParams.ip;
        result.payerEmail = formParams.email;
        result.payerFingerprint = formParams.fingerprint;
        result.cardNumberMask = formParams.cardNumberMask;
        result.customerID = formParams.customerID;
        return result;
    }
}

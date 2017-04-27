import { FormSearchParams } from 'koffing/analytics/invoices/search-form/form-search-params';
import { SearchPaymentsParams } from 'koffing/backend/requests/search-payments-request';

export class SearchDetailsService {

    public static toSearchParams(limit: number, offset: number, formParams: FormSearchParams): SearchPaymentsParams {
        const result = new SearchPaymentsParams();
        result.limit = limit;
        result.offset = offset;
        result.fromTime = formParams.paymentFrom;
        result.toTime = formParams.paymentTo;
        result.invoiceID = formParams.invoiceID;
        result.paymentID = formParams.paymentID;
        result.paymentStatus = formParams.paymentStatus;
        result.payerIP = formParams.payerIP;
        result.payerEmail = formParams.payerEmail;
        return result;
    }
}

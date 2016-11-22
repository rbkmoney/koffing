import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class InvoiceService {

    constructor(private http: Http) {
    }

    getInvoices(shopID: string, request: any): Promise<any> {
        let params = new URLSearchParams();
        params.set('fromTime', request.fromTime);
        params.set('toTime', request.toTime);
        params.set('limit', request.limit);
        params.set('offset', request.offset);
        params.set('invoiceID', request.invoiceID);
        return this.http.get(`http://localhost:9000/v1/analytics/shops/${shopID}/invoices`, {
            search: params
        }).toPromise().then(response => response.json());
    }
}
export class Invoice {
    id: number;
    shopID: number;
    amount: number;
    currency: string;
    description: string;
    dueDate: string;
    product: string;
    status: string;
}
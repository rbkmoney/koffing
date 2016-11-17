import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class InvoiceService {

    constructor(private http: Http) {
    }

    getInvoices(shopID: string): Promise<any> {
        return this.http.get(`http://localhost:9000/v1/analytics/shops/${shopID}/invoices`).toPromise()
            .then(function (response) {
                return response.json();
            })
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


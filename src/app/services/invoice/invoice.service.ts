import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { ConfigService } from './../../config.service';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class InvoiceService {

    constructor(private http: Http, private config: ConfigService) { }

    public getInvoices(shopID: string, request: any): Promise<any> {
        let params = new URLSearchParams();
        params.set('fromTime', request.fromTime);
        params.set('toTime', request.toTime);
        params.set('limit', request.limit);
        params.set('offset', request.offset);
        params.set('invoiceID', request.invoiceID);
        return this.http.get(`${this.config.capiUrl}/analytics/shops/${shopID}/invoices`, {
            search: params
        }).toPromise().then(response => response.json());
    }
}

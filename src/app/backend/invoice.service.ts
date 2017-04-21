import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { toString } from 'lodash';

import { ConfigService } from 'koffing/backend/services/config.service';
import { InvoiceSearchResult } from 'koffing/backend/model/invoice-search-result';

@Injectable()
export class InvoiceService {

    constructor(private http: Http,
                private config: ConfigService) {
    }

    //TODO status must be array
    public getInvoices(shopID: string, fromTime: Date, toTime: Date, limit?: number, offset?: number, status?: string, invoiceID?: string): Observable<InvoiceSearchResult> {
        const params = new URLSearchParams();
        params.set('fromTime', this.toUTC(fromTime));
        params.set('toTime', this.toUTC(toTime));
        limit && params.set('limit', toString(limit));
        offset && params.set('offset', toString(offset));
        status && params.set('status', status);
        invoiceID && params.set('invoiceID', invoiceID);
        return this.http.get(`${this.config.capiUrl}/analytics/shops/${shopID}/invoices`, {search: params}).map((res) => res.json());
    }

    private toUTC(date: Date): string {
        return moment(date).utc().format();
    }
}

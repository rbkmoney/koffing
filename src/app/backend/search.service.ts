import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { toString } from 'lodash';

import { InvoiceSearchResult } from 'koffing/backend/model/invoice-search-result';
import { ConfigService } from 'koffing/backend/services/config.service';
import { PaymentSearchResult } from 'koffing/backend/model/payment-search-result';

@Injectable()
export class SearchService {

    constructor(private http: Http,
                private config: ConfigService) {
    }

    public searchInvoices(shopID: string, fromTime: Date, toTime: Date, limit?: number, offset?: number,
                          invoiceStatus?: string, paymentStatus?: string, invoiceID?: string, paymentID?: string,
                          payerEmail?: string, payerIP?: string, cardNumberMask?: string, payerFingerprint?: string,
                          paymentAmount?: number, invoiceAmount?: number): Observable<InvoiceSearchResult> {
        const params = new URLSearchParams();
        params.set('fromTime', this.toUTC(fromTime));
        params.set('toTime', this.toUTC(toTime));
        limit && params.set('limit', toString(limit));
        offset && params.set('offset', toString(offset));
        invoiceStatus && params.set('invoiceStatus', invoiceStatus);
        paymentStatus && params.set('paymentStatus', paymentStatus);
        invoiceID && params.set('invoiceID', invoiceID);
        paymentID && params.set('paymentID', paymentID);
        payerEmail && params.set('payerEmail', payerEmail);
        payerIP && params.set('payerIP', payerIP);
        cardNumberMask && params.set('cardNumberMask', cardNumberMask);
        payerFingerprint && params.set('payerFingerprint', payerFingerprint);
        paymentAmount && params.set('paymentAmount', toString(paymentAmount));
        invoiceAmount && params.set('invoiceAmount', toString(invoiceAmount));
        return this.http.get(`${this.config.capiUrl}/analytics/shops/${shopID}/invoices`, {search: params}).map((res) => res.json());
    }

    public searchPayments(shopID: string, fromTime: Date, toTime: Date, limit?: number, offset?: number,
                          paymentStatus?: string, invoiceID?: string, paymentID?: string, payerEmail?: string,
                          payerIP?: string, cardNumberMask?: string, payerFingerprint?: string, paymentAmount?: number): Observable<PaymentSearchResult> {
        const params = new URLSearchParams();
        params.set('fromTime', this.toUTC(fromTime));
        params.set('toTime', this.toUTC(toTime));
        limit && params.set('limit', toString(limit));
        offset && params.set('offset', toString(offset));
        paymentStatus && params.set('paymentStatus', paymentStatus);
        invoiceID && params.set('invoiceID', invoiceID);
        paymentID && params.set('paymentID', paymentID);
        payerEmail && params.set('payerEmail', payerEmail);
        payerIP && params.set('payerIP', payerIP);
        cardNumberMask && params.set('cardNumberMask', cardNumberMask);
        payerFingerprint && params.set('payerFingerprint', payerFingerprint);
        paymentAmount && params.set('paymentAmount', toString(paymentAmount));
        return this.http.get(`${this.config.capiUrl}/analytics/shops/${shopID}/payments`, {search: params}).map((res) => res.json());
    }

    public searchPaymentsStub(): Observable<PaymentSearchResult> {
        return this.http.get(`${this.config.capiUrl}/analytics/shops/${1}/payments`).map((res) => res.json());
    }

    private toUTC(date: Date): string {
        return moment(date).utc().format();
    }
}

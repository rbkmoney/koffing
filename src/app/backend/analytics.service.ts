import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import * as moment from 'moment';
import * as _ from 'lodash';

import { ConfigService } from 'koffing/backend/services/config.service';
import { PaymentMethodStat } from 'koffing/backend/model/payment-method-stat.class';
import { PaymentRateStat } from 'koffing/backend/model/payment-rate-stat.class';
import { PaymentGeoStat } from 'koffing/backend/model/payment-geo-stat.class';
import { PaymentConversionStat } from 'koffing/backend/model/payment-conversion-stat.class';
import { PaymentRevenueStat } from 'koffing/backend/model/payment-revenue-stat.class';

@Injectable()
export class AnalyticsService {

    constructor(private http: Http,
                private config: ConfigService) {
    }

    public getPaymentMethodStats(shopID: number, from: Date, to: Date, splitUnit?: string, splitSize?: number, paymentMethod?: string): Promise<PaymentMethodStat[]> {
        const params = new URLSearchParams();
        params.set('fromTime', this.getDate(from));
        params.set('toTime', this.getDate(to));
        params.set('splitUnit', splitUnit || 'minute');
        params.set('splitSize', this.getSplitSize(splitSize));
        params.set('paymentMethod', paymentMethod || 'bankCard');
        return this.http.get(`${this.config.capiUrl}/analytics/shops/${shopID}/customers/stats/payment_method`, {search: params})
            .toPromise()
            .then((response) => response.json());
    }

    public getPaymentRateStats(shopID: number, from: Date, to: Date): Promise<PaymentRateStat> {
        const params = new URLSearchParams();
        params.set('fromTime', this.getDate(from));
        params.set('toTime', this.getDate(to));
        return this.http.get(`${this.config.capiUrl}/analytics/shops/${shopID}/customers/stats/rate`, {search: params})
            .toPromise()
            .then((response) => response.json());
    }

    public getPaymentConversionStats(shopID: number, from: Date, to: Date, splitUnit?: string, splitSize?: number): Promise<PaymentConversionStat[]> {
        const params = new URLSearchParams();
        params.set('fromTime', this.getDate(from));
        params.set('toTime', this.getDate(to));
        params.set('splitUnit', splitUnit || 'minute');
        params.set('splitSize', this.getSplitSize(splitSize));
        return this.http.get(`${this.config.capiUrl}/analytics/shops/${shopID}/payments/stats/conversion`, {search: params})
            .toPromise()
            .then(response => response.json());
    }

    public getPaymentGeoStats(shopID: number, from: Date, to: Date, splitUnit?: string, splitSize?: number): Promise<PaymentGeoStat[]> {
        const params = new URLSearchParams();
        params.set('fromTime', this.getDate(from));
        params.set('toTime', this.getDate(to));
        params.set('splitUnit', splitUnit || 'day');
        params.set('splitSize', this.getSplitSize(splitSize));
        return this.http.get(`${this.config.capiUrl}/analytics/shops/${shopID}/payments/stats/geo`, {search: params})
            .toPromise()
            .then(response => response.json());
    }

    public getPaymentRevenueStats(shopID: number, from: Date, to: Date, splitUnit?: string, splitSize?: number): Promise<PaymentRevenueStat[]> {
        const params = new URLSearchParams();
        params.set('fromTime', this.getDate(from));
        params.set('toTime', this.getDate(to));
        params.set('splitUnit', splitUnit || 'minute');
        params.set('splitSize', this.getSplitSize(splitSize));
        return this.http.get(`${this.config.capiUrl}/analytics/shops/${shopID}/payments/stats/revenue`, {search: params})
            .toPromise()
            .then(response => response.json());
    }
    
    private getDate(date: Date) {
        return moment(date).utc().format();
    }

    private getSplitSize(splitSize: number) {
        return splitSize ? _.toString(splitSize) : '1';
    }
}

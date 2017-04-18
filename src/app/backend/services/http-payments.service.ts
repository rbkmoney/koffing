import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

import { PaymentRevenueStat } from '../model/statistics/payment-revenue-stat.class';
import { PaymentConversionStat } from '../model/statistics/payment-conversion-stat.class';
import { RequestParams } from '../classes/request-params.class';
import { ConfigService } from './config.service';

@Injectable()
export class HttpPaymentsService {

    constructor(
        private http: Http,
        private config: ConfigService
    ) {}

    public getRevenueStat(shopID: string, requestParams: RequestParams): Promise<PaymentRevenueStat[]> {
        const params = new URLSearchParams();

        const fromTime = moment(requestParams.fromTime).utc().format();
        const toTime = moment(requestParams.toTime).utc().format();

        params.set('fromTime', fromTime);
        params.set('toTime', toTime);
        params.set('splitUnit', requestParams.splitUnit);
        params.set('splitSize', requestParams.splitSize);

        return this.http.get(`${this.config.capiUrl}/analytics/shops/${shopID}/payments/stats/revenue`, {search: params})
            .toPromise()
            .then(response => response.json());
    }

    public getConversionStat(shopID: string, requestParams: RequestParams): Promise<PaymentConversionStat[]> {
        const params = new URLSearchParams();

        const fromTime = moment(requestParams.fromTime).utc().format();
        const toTime = moment(requestParams.toTime).utc().format();

        params.set('fromTime', fromTime);
        params.set('toTime', toTime);
        params.set('splitUnit', requestParams.splitUnit);
        params.set('splitSize', requestParams.splitSize);

        return this.http.get(`${this.config.capiUrl}/analytics/shops/${shopID}/payments/stats/conversion`, {search: params})
            .toPromise()
            .then(response => response.json());
    }
}

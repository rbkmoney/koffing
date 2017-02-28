import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

import { RequestParams } from '../classes/request-params.class';
import { ConfigService } from './config.service';

@Injectable()
export class CustomerService {

    constructor(
        private http: Http,
        private config: ConfigService
    ) {}

    public getPaymentMethod(shopID: number, requestParams: RequestParams): Promise<any> {
        const fromTime = moment(requestParams.fromTime).utc().format();
        const toTime = moment(requestParams.toTime).utc().format();

        const params = new URLSearchParams();
        params.set('fromTime', fromTime);
        params.set('toTime', toTime);
        params.set('splitUnit', requestParams.splitUnit);
        params.set('splitSize', requestParams.splitSize);
        params.set('paymentMethod', requestParams.paymentMethod);

        return this.http.get(`${this.config.capiUrl}/analytics/shops/${shopID}/customers/stats/payment_method`, {search: params})
            .toPromise()
            .then((response) => response.json());
    }

    public getRate(shopID: number, requestParams: RequestParams): Promise<any> {
        const fromTime = moment(requestParams.fromTime).utc().format();
        const toTime = moment(requestParams.toTime).utc().format();

        const params = new URLSearchParams();
        params.set('fromTime', fromTime);
        params.set('toTime', toTime);

        return this.http.get(`${this.config.capiUrl}/analytics/shops/${shopID}/customers/stats/rate`, {search: params})
            .toPromise()
            .then((response) => response.json());
    }
}

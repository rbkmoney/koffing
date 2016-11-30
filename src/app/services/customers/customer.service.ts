import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ConfigService } from '../../config.service';
import { RequestParams } from '../RequestParams';

@Injectable()
export class CustomerService {

    constructor(private http: Http, private config: ConfigService) { }

    public getPaymentMethod(shopID: string, requestParams: RequestParams): Promise<any> {
        let params = new URLSearchParams();

        params.set('fromTime', requestParams.fromTime);
        params.set('toTime', requestParams.toTime);
        params.set('splitUnit', requestParams.splitUnit);
        params.set('splitSize', requestParams.splitSize);
        params.set('paymentMethod', requestParams.paymentMethod);

        return this.http.get(`${this.config.capiUrl}/analytics/shops/${shopID}/customers/stats/payment_method`, {
            search: params
        })
            .toPromise()
            .then(
                response => {
                    return response.json();
                }
            );
    }

    public getRate(shopID: string, requestParams: RequestParams): Promise<any> {
        let params = new URLSearchParams();

        params.set('fromTime', requestParams.fromTime);
        params.set('toTime', requestParams.toTime);

        return this.http.get(`${this.config.capiUrl}/analytics/shops/${shopID}/customers/stats/rate`, {
            search: params
        })
            .toPromise()
            .then(
                response => {
                    return response.json();
                }
            );
    }
}

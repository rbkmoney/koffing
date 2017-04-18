import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';
import * as _ from 'lodash';

import { RequestParams } from '../classes/request-params.class';
import { LocationName } from '../model/statistics/location-name.class';
import { PaymentGeoStat } from '../model/statistics/payment-geo-stat.class';
import { ConfigService } from './config.service';

@Injectable()
export class HttpGeolocationService {

    constructor(
        private http: Http,
        private config: ConfigService
    ) {}

    public getGeoChartData(shopID: string, requestParams: RequestParams): Promise<PaymentGeoStat[]> {
        const params = new URLSearchParams();

        const fromTime = moment(requestParams.fromTime).utc().format();
        const toTime = moment(requestParams.toTime).utc().format();

        params.set('fromTime', fromTime);
        params.set('toTime', toTime);
        params.set('splitUnit', requestParams.splitUnit);
        params.set('splitSize', requestParams.splitSize);

        return this.http.get(`${this.config.capiUrl}/analytics/shops/${shopID}/payments/stats/geo`, {search: params})
            .toPromise()
            .then(response => response.json());
    }

    public getLocationNames(geoIDs: string[], language: string): Promise<LocationName[]> {
        const params = new URLSearchParams();

        params.set('geoIDs', _.join(geoIDs, ','));
        params.set('language', language);

        return this.http.get(`${this.config.capiUrl}/reference/geo/location/names`, {search: params})
            .toPromise()
            .then(response => response.json());
    }

}

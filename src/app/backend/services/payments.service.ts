import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { GeoData } from '../classes/geodata.class';
import { Revenue } from '../classes/revenue.class';
import { Conversion } from '../classes/conversion.class';
import { RequestParams } from '../classes/request-params.class';
import { ConfigService } from './config.service';

@Injectable()
export class PaymentsService {

    constructor(private http: Http, private config: ConfigService) { }

    public getGeoChartData(shopID: string, requestParams: RequestParams): Promise<GeoData[]> {
        const params = new URLSearchParams();
        params.set('fromTime', requestParams.fromTime);
        params.set('toTime', requestParams.toTime);
        params.set('splitUnit', requestParams.splitUnit);
        params.set('splitSize', requestParams.splitSize);
        return this.http.get(`${this.config.capiUrl}/analytics/shops/${shopID}/payments/stats/geo`, {
            search: params
        })
            .toPromise()
            .then(response => response.json());
    }

    public getRevenueStat(shopID: string, requestParams: RequestParams): Promise<Revenue[]> {
        const params = new URLSearchParams();
        params.set('fromTime', requestParams.fromTime);
        params.set('toTime', requestParams.toTime);
        params.set('splitUnit', requestParams.splitUnit);
        params.set('splitSize', requestParams.splitSize);

        return this.http.get(`${this.config.capiUrl}/analytics/shops/${shopID}/payments/stats/revenue`, {
            search: params
        })
            .toPromise()
            .then(response => response.json());
    }

    public getConversionStat(shopID: string, requestParams: RequestParams): Promise<Conversion[]> {
        const params = new URLSearchParams();
        params.set('fromTime', requestParams.fromTime);
        params.set('toTime', requestParams.toTime);
        params.set('splitUnit', requestParams.splitUnit);
        params.set('splitSize', requestParams.splitSize);
        return this.http.get(`${this.config.capiUrl}/analytics/shops/${shopID}/payments/stats/conversion`, {
            search: params
        })
            .toPromise()
            .then(response => response.json());
    }
}

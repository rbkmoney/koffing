import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ConfigService } from './../../config.service';
import { RequestParams } from '../RequestParams';
import { GeoData } from './geodata.class';
import { Revenue } from './revenue.class';
import { Conversion } from './conversion.class';

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

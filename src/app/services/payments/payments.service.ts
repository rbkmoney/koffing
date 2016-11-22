import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ConfigService } from './../../config.service';
import { GeoData } from './geodata';
import { Revenue } from './revenue';
import { Conversion } from './conversion';
import RequestParams from './../RequestParams';

@Injectable()
export class PaymentsService {

    constructor(
        private http: Http,
        private config: ConfigService
    ) {}

    handleError(): void {
        //debugger;
    }

    getGeoChartData(shopID: string, requestParams: RequestParams): Promise<GeoData[]> {
        let params = new URLSearchParams();

        params.set('fromTime', requestParams.fromTime);
        params.set('toTime', requestParams.toTime);
        params.set('splitUnit', requestParams.splitUnit);
        params.set('splitSize', requestParams.splitSize);

        return this.http.get(`${this.config.capiUrl}/analytics/shops/${shopID}/payments/stats/geo`, {
                search: params
            })
            .toPromise()
            .then(function(response) {
                return response.json() as GeoData[];
            })
            .catch(this.handleError)
    }

    getRevenueStat(shopID: string, requestParams: RequestParams): Promise<Revenue[]> {
        let params = new URLSearchParams();

        params.set('fromTime', requestParams.fromTime);
        params.set('toTime', requestParams.toTime);
        params.set('splitUnit', requestParams.splitUnit);
        params.set('splitSize', requestParams.splitSize);

        return this.http.get(`${this.config.capiUrl}/analytics/shops/${shopID}/payments/stats/revenue`, {
                search: params
            })
            .toPromise()
            .then(function(response) {
                return response.json() as Revenue[];
            })
            .catch(this.handleError)
    }

    getConversionStat(shopID: string, requestParams: RequestParams): Promise<Conversion[]> {
        let params = new URLSearchParams();

        params.set('fromTime', requestParams.fromTime);
        params.set('toTime', requestParams.toTime);
        params.set('splitUnit', requestParams.splitUnit);
        params.set('splitSize', requestParams.splitSize);

        return this.http.get(`${this.config.capiUrl}/analytics/shops/${shopID}/payments/stats/conversion`, {
                search: params
            })
            .toPromise()
            .then(function(response) {
                return response.json() as Conversion[];
            })
            .catch(this.handleError)
    }

}
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ConfigService } from './../../config.service';
import { GeoData } from './geodata';
import { Revenue } from './revenue';

@Injectable()
export class PaymentsService {

    constructor(
        private http: Http,
        private config: ConfigService
    ) {}

    handleError(): void {
        //debugger;
    }

    getGeoChartData(shopID): Promise<GeoData[]> {
        return this.http.get(`${this.config.capiUrl}/analytics/shops/${shopID}/payments/stats/geo`)
            .toPromise()
            .then(function(response) {
                return response.json() as GeoData[];
            })
            .catch(this.handleError)
    }

    getRevenueStat(shopID): Promise<Revenue[]> {
        return this.http.get(`${this.config.capiUrl}/analytics/shops/${shopID}/payments/stats/revenue`)
            .toPromise()
            .then(function(response) {
                return response.json() as Revenue[];
            })
            .catch(this.handleError)
    }

}
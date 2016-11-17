import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ConfigService } from './../../config.service';
import { GeoData } from './geodata';

@Injectable()
export class PaymentsService {

    constructor(
        private http: Http,
        private config: ConfigService
    ) {}

    handleError(): void {
        //debugger;
    }

    getGeoChartData(shopID): Promise<any> {
        return this.http.get(`${this.config.capiUrl}/analytics/shops/${shopID}/payments/stats/geo`)
            .toPromise()
            .then(function(response) {
                return response.json() as GeoData[];
            })
            .catch(this.handleError)

    }

}
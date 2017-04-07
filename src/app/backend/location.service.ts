import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import * as _ from 'lodash';

import { ConfigService } from 'koffing/backend/services/config.service';
import { LocationName } from 'koffing/backend/model/location-name.class';

@Injectable()
export class LocationService {

    constructor(
        private http: Http,
        private config: ConfigService
    ) {}

    public getLocationsNames(geoIDs: number[], language?: string): Promise<LocationName[]> {
        const params = new URLSearchParams();
        params.set('geoIDs', _.join(geoIDs, ','));
        params.set('language', language || 'ru');
        return this.http.get(`${this.config.capiUrl}/reference/geo/location/names`, {search: params})
            .toPromise()
            .then(response => response.json());
    }
}

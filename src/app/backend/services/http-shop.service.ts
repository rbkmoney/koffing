import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ConfigService } from './config.service';
import { Shop } from 'koffing/backend/backend.module';

@Injectable()
export class HttpShopService {

    private shopsUrl: string = `${this.config.capiUrl}/processing/shops`;

    constructor(
        private http: Http,
        private config: ConfigService
    ) { }

    public getShops(): Promise<Shop[]> {
        return this.http.get(this.shopsUrl)
            .toPromise()
            .then(response => response.json());
    }

    public getShop(shopID: string): Promise<Shop> {
        return this.http.get(`${this.shopsUrl}/${shopID}`)
            .toPromise()
            .then(response => response.json());
    }

    public activateShop(shopID: string): Promise<string> {
        return this.http.put(`${this.shopsUrl}/${shopID}/activate`, {})
            .toPromise()
            .then(response => response.json());
    }

    public suspendShop(shopID: string): Promise<string> {
        return this.http.put(`${this.shopsUrl}/${shopID}/suspend`, {})
            .toPromise()
            .then(response => response.json());
    }
}

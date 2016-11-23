import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Shop } from './shop';
import { ConfigService } from './../../config.service';

@Injectable()
export class ShopService {

    constructor(
        private http: Http,
        private config: ConfigService
    ) {}

    getShops(): Promise<Shop[]> {
        return this.http.get(`${this.config.capiUrl}/processing/me`)
            .toPromise()
            .then(function(response) {
                return response.json().shops as Shop[];
            })
    }

    createShop(args: any): Promise<string> {
        let params = {
            categoryRef: args.categoryRef,
            shopDetails: args.shopDetails,
            contractor: args.contractor
        };

        return this.http.post(`${this.config.capiUrl}/processing/shops`, params)
            .toPromise()
            .then(function(response) {
                return response.json();
            })
    }

    updateShop(shopID: any, args: any): Promise<string> {
        let url = `${this.config.capiUrl}/processing/shops/${shopID}`,
            params = {
                categoryRef: args.categoryRef,
                shopDetails: args.shopDetails,
                contractor: args.contractor
            };

        return this.http.post(url, params)
            .toPromise()
            .then(function(response) {
                return response.json();
            })
    }

    activateShop(shopID: any): Promise<string> {
        let url = `${this.config.capiUrl}/processing/shops/${shopID}/activate`,
            params = {};

        return this.http.put(url, params)
            .toPromise()
            .then(function(response) {
                return response.json();
            })
    }

}
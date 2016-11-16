import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Shop } from './shop';
import { Urls } from './../../app-config/constants';

@Injectable()
export class ShopService {

    constructor(private http: Http) {}

    handleError(): void {
        //debugger;
    }

    getShops(): Promise<Shop[]> {
        return this.http.get(Urls.myparty)
            .toPromise()
            .then(function(response) {
                return response.json().shops as Shop[];
            })
            .catch(this.handleError)
    }

    createShop(args: any): Promise<string> {
        let params = {
            categoryRef: args.categoryRef,
            shopDetails: args.shopDetails,
            contractor: args.contractor
        };

        return this.http.post(Urls.shops, params)
            .toPromise()
            .then(function(response) {
                return response.json();
            })
            .catch(this.handleError)
    }

    updateShop(shopID: any, args: any): Promise<string> {
        let url = Urls.base + `shops/${shopID}`,
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
            .catch(this.handleError)
    }

    activateShop(shopID: any): Promise<string> {
        let url = Urls.base + `shops/${shopID}/activate`,
            params = {};

        return this.http.put(url, params)
            .toPromise()
            .then(function(response) {
                return response.json();
            })
            .catch(this.handleError)
    }

}
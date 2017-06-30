import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Shop } from '../model/shop.class';
import { ConfigService } from './config.service';
import { ShopParams } from 'koffing/backend/classes/shop-params.class';
import { Observable } from 'rxjs';

@Injectable()
export class ShopService {

    private shopsUrl: string = `${this.config.capiUrl}/processing/shops`;

    constructor(
        private http: Http,
        private config: ConfigService
    ) { }

    public getShops(): Promise<Shop[]> {
        return this.http.get(this.shopsUrl)
            .toPromise()
            .then(response => response.json() as Shop[]);
    }

    public getShop(shopID: number): Promise<Shop> {
        return this.http.get(`${this.shopsUrl}/${shopID}`)
            .toPromise()
            .then(response => response.json() as Shop);
    }

    public getShopObservable(shopID: string): Observable<Shop> {
        return this.http.get(`${this.shopsUrl}/${shopID}`)
            .map((res) => res.json());
    }

    public createShop(args: ShopParams): Promise<string> {
        return this.http.post(this.shopsUrl, args)
            .toPromise()
            .then(response => response.json());
    }

    public updateShop(shopID: number, args: ShopParams): Promise<string> {
        return this.http.post(`${this.shopsUrl}/${shopID}`, args)
            .toPromise()
            .then(response => response.json());
    }

    public activateShop(shopID: any): Promise<string> {
        return this.http.put(`${this.shopsUrl}/${shopID}/activate`, {})
            .toPromise()
            .then(response => response.json());
    }

    public suspendShop(shopID: any): Promise<string> {
        return this.http.put(`${this.shopsUrl}/${shopID}/suspend`, {})
            .toPromise()
            .then(response => response.json());
    }
}

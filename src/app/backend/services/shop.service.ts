import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Shop } from '../classes/shop.class';
import { ConfigService } from './config.service';
import { CreateShopArgs } from 'koffing/backend/classes/create-shop-args.class';

@Injectable()
export class ShopService {

    private shopsUrl: string = `${this.config.capiUrl}/processing/shops`;

    constructor(private http: Http, private config: ConfigService) {}

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

    public createShop(args: CreateShopArgs): Promise<string> {
        return this.http.post(this.shopsUrl, args)
            .toPromise()
            .then(response => response.json());
    }

    public updateShop(shop: Shop): Promise<string> {
        const params = {
            categoryID: shop.categoryID,
            contractID: shop.contractID,
            payoutToolID: shop.payoutToolID,
            details: shop.details,
            callbackUrl: shop.callbackHandler.url
        };
        return this.http.post(`${this.shopsUrl}/${shop.id}`, params)
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

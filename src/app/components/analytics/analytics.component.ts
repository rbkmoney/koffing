import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Shop, ShopItem } from './../../services/shop/shop';
import { ShopService } from './../../services/shop/shop.service';

@Component({
    selector: 'analytics',
    templateUrl: './analytics.component.pug',
    providers: [ShopService]
})
export class AnalyticsComponent implements OnInit {

    public shops: Array<Shop> = [];
    public shopItems: Array<ShopItem> = [];
    public activeShopItem: ShopItem;

    constructor(
        private shopService: ShopService
    ) {}

    ngOnInit() {
        this.shopService.getShops().then(shops => {
            this.shops = shops;

            if(!(this.shops.length)) {
                return;
            }

            this.shops.forEach((shop: Shop) => {
                this.shopItems.push(new ShopItem(shop.shopID, shop.shopDetails.name));
            });
            console.log(this.shopItems);
            // this.onSelectShop(this.shopItems[0]);
        });
    }

    onSelectShop(item: ShopItem) {
        this.activeShopItem = item;
        // this.router.navigate(['/dashboard', this.activeShopItem.value]);
        console.log(this.activeShopItem);
    }
}
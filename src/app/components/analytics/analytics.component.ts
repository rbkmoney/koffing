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

    public shopItems: Array<ShopItem> = [];
    private shops: Array<Shop> = [];
    private selectedShopID: string = '';
    private isUploadedDataShops: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private shopService: ShopService
    ) {}

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.selectedShopID = params['shopID'];
        });

        this.shopService.getShops().then(shops => {
            this.isUploadedDataShops = true;
            if(!shops.length) {
                return;
            }
            this.shops = shops;
            this.shops.forEach((shop: Shop) => {
                this.shopItems.push(new ShopItem(shop.shopID, shop.shopDetails.name));
            });

            if(this.selectedShopID === '' || typeof(this.selectedShopID) === 'undefined') {
                this.selectedShopID = this.shops[0].shopID;
            }
            this.goToShop(this.selectedShopID);
        });
    }

    onSelectShop(shopItem: ShopItem) {
        this.selectedShopID = shopItem.value;
        this.goToShop(this.selectedShopID);
    }

    goToShop(shopID: string) {
        this.router.navigate(['analytics', shopID, 'dashboard']);
    }
}
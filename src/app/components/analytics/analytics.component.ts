import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Shop, ShopItem} from './../../services/shop/shop';
import {ShopService} from './../../services/shop/shop.service';
import * as _ from 'lodash';

@Component({
    selector: 'analytics',
    templateUrl: './analytics.component.pug',
    providers: [ShopService]
})
export class AnalyticsComponent implements OnInit {

    public selectedShopID: string;
    public shopItems: Array<ShopItem> = [];

    constructor(private route: ActivatedRoute,
                private router: Router,
                private shopService: ShopService) {
    }

    ngOnInit() {
        const shopID = this.route.snapshot.params['shopID'];
        if (shopID) {
            this.selectedShopID = shopID;
        }
        this.shopService.getShops().then((shops: Shop[]) => {
            this.shopItems = _.map(shops, (shop: Shop) => new ShopItem(shop.shopID, shop.shopDetails.name));
        });
    }

    onSelectShop(shopItem: ShopItem) {
        this.selectedShopID = shopItem.value;
        this.router.navigate(['analytics', this.selectedShopID, 'dashboard']);
    }

}
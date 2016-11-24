import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

import { ShopService } from './../../services/shop/shop.service';
import { ShopItem } from '../../services/shop/shop-item.class';
import { Shop } from '../../services/shop/shop.class';

@Component({
    selector: 'kof-analytics',
    templateUrl: './analytics.component.pug'
})
export class AnalyticsComponent implements OnInit {

    public selectedShopID: string;

    public shopItems: ShopItem[] = [];

    constructor(private route: ActivatedRoute,
                private router: Router,
                private shopService: ShopService) { }

    public ngOnInit() {
        this.shopService.getShops().then((shops: Shop[]) => {
            const routeShopID = this.route.snapshot.params['shopID'];
            this.shopItems = _.map(shops, (shop: Shop) => new ShopItem(shop.shopID, shop.shopDetails.name));
            this.selectedShopID = routeShopID ? routeShopID : this.shopItems[0].value;
            this.navigate();
        });
    }

    public onSelectShop(shopID: string) {
        this.selectedShopID = shopID;
        this.navigate();
    }

    public navigate() {
        const hasChildren = this.route.children.length > 0;
        const childComponent = hasChildren ? this.route.children[0].routeConfig.path : 'dashboard';
        this.router.navigate(['analytics', this.selectedShopID, childComponent]);
    }
}

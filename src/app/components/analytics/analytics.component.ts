import * as _ from 'lodash';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Shop, ShopItem} from './../../services/shop/shop';
import {ShopService} from './../../services/shop/shop.service';

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
        this.shopService.getShops().then((shops: Shop[]) => {
            const routeShopID = this.route.snapshot.params['shopID'];
            this.shopItems = _.map(shops, (shop: Shop) => new ShopItem(shop.shopID, shop.shopDetails.name));
            this.selectedShopID = routeShopID ? routeShopID : this.shopItems[0].value;
            this.navigate();
        });
    }

    onSelectShop(shopItem: ShopItem) {
        this.selectedShopID = shopItem.value;
        this.navigate();
    }

    navigate() {
        const hasChildren = this.route.children.length > 0;
        const childComponent = hasChildren ? this.route.children[0].routeConfig.path : 'dashboard';
        this.router.navigate(['analytics', this.selectedShopID, childComponent]);
    }

}
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

import { Shop } from 'koffing/backend/classes/shop.class';
import { SelectItem } from 'koffing/common/components/select/select.class';
import { ShopIDStorage } from 'koffing/analytics/shop-id-storage.service';
import { ShopService } from 'koffing/backend/services/shop.service';

@Injectable()
export class AnalyticsService {

    private shops: Shop[];

    constructor(private shopService: ShopService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    public getShopItems(): Promise<SelectItem[]> {
        return new Promise((resolve) => {
            this.shopService.getShops().then((shops: Shop[]) => {
                this.shops = shops;
                const shopItems = this.toShopItems(shops);
                resolve(shopItems);
            });
        });
    }

    public getActiveShopID(): number {
        const routeShopID = Number(this.route.snapshot.params['shopID']);
        return routeShopID ? routeShopID : this.getFromStorage(this.shops);
    }

    public navigateToShop(shopID: number) {
        ShopIDStorage.set(shopID);
        const hasChildren = this.route.children.length > 0;
        const childComponent = hasChildren ? this.route.children[0].routeConfig.path : 'dashboard';
        this.router.navigate(['analytics', shopID, childComponent]);
    }

    private toShopItems(shops: Shop[]): SelectItem[] {
        return _.map(shops, (shop) => new SelectItem(shop.id, shop.details.name));
    }

    private getFromStorage(shops: Shop[]) {
        return ShopIDStorage.isAvailable(shops) ? ShopIDStorage.get() : this.shops[0].id;
    }
}

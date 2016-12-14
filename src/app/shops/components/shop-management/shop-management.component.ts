import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { Category } from 'kof-modules/backend/backend.module';
import { CategoryService } from 'kof-modules/backend/backend.module';
import { Shop } from 'kof-modules/backend/backend.module';
import { ShopService } from 'kof-modules/backend/backend.module';
import { KofSlimBarService } from 'kof-modules/common/services/slim-bar.service';

@Component({
    selector: 'kof-shops',
    templateUrl: 'shop-management.component.pug'
})
export class ShopManagementComponent implements OnInit {

    public shops: Shop[] = [];
    public categories: Category[] = [];

    private isLoading: boolean;

    constructor(
        private shopService: ShopService,
        private categoryService: CategoryService,
        private slimBarService: KofSlimBarService
    ) { }

    public activateShop(shop: any) {
        this.isLoading = true;

        this.shopService.activateShop(shop.shopID).then(() => {
            this.loadShops().then(() => {
                this.isLoading = false;
            });
        });
    }

    public loadShops() {
        return new Promise((resolve) => {
            this.shopService.getShops().then(aShops => {
                this.shops = aShops;

                resolve();
            });
        });
    }

    public loadCategories() {
        return new Promise((resolve) => {
            this.categoryService.getCategories().then(aCategories => {
                this.categories = aCategories;

                resolve();
            });
        });
    }

    public getCategory(categoryRef: number): Category {
        let result = new Category();
        if (this.categories.length > 0) {
            result = _.find(this.categories, (category: Category) => category.categoryRef === categoryRef);
        }
        return result;
    }

    public ngOnInit() {
        this.slimBarService.start();
        this.isLoading = true;
        Promise.all([
            this.loadShops(),
            this.loadCategories()
        ]).then(() => {
            this.isLoading = false;
            this.slimBarService.stop();
        });
    }
}

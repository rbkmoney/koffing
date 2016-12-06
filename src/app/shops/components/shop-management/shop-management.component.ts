import { Component, OnInit } from '@angular/core';

import { Category } from 'kof-modules/backend/backend.module';
import { CategoryService } from 'kof-modules/backend/backend.module';
import { Shop } from 'kof-modules/backend/backend.module';
import { ShopService } from 'kof-modules/backend/backend.module';

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
        private categoryService: CategoryService
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
        let category = new Category();
        for (let i = 0; i < this.categories.length; i++) {
            if (this.categories[i].categoryRef === categoryRef) {
                category = this.categories[i];
            }
        }
        return category;
    }

    public ngOnInit() {
        this.isLoading = true;
        Promise.all([
            this.loadShops(),
            this.loadCategories()
        ]).then(() => {
            this.isLoading = false;
        });
    }
}

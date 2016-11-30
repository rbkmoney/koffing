import { Component, OnInit } from '@angular/core';

import { Category } from '../../../backend/classes/category.class';
import { CategoryService } from '../../../backend/services/category.service';
import { Shop } from '../../../backend/classes/shop.class';
import { ShopService } from '../../../backend/services/shop.service';

@Component({
    selector: 'kof-shops',
    templateUrl: './shop-management.pug'
})
export class ShopManagementComponent implements OnInit {

    public shops: Shop[] = [];

    public categories: Category[] = [];

    constructor(private shopService: ShopService, private categoryService: CategoryService) { }

    public activateShop(shop: any) {
        this.shopService.activateShop(shop.shopID).then(() => this.getShops());
    }

    public getShops() {
        this.shopService.getShops().then(aShops => {
            this.shops = aShops;
        });
    }

    public getCategories() {
        this.categoryService.getCategories().then(aCategories => {
            this.categories = aCategories;
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
        this.getShops();
        this.getCategories();
    }
}

import { Component, OnInit } from '@angular/core';

import { ShopService } from './../../services/shop/shop.service';
import { CategoryService } from './../../services/category/category.service';
import { Category } from '../../services/category/category.class';
import { Shop } from '../../services/shop/shop.class';

@Component({
    selector: 'kof-shops',
    templateUrl: './shops.component.pug',
    providers: [ShopService, CategoryService]
})

export class ShopsComponent implements OnInit {

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

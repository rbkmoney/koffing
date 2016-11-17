import { Component, OnInit } from '@angular/core';
import { Shop } from './../../services/shop/shop';
import { ShopService } from './../../services/shop/shop.service';
import { Category} from './../../services/category/category';
import { CategoryService } from './../../services/category/category.service';

@Component({
    selector: 'shops',
    templateUrl: './shops.component.pug',
    providers: [ShopService, CategoryService]
})

export class ShopsComponent implements OnInit {
    public shops: Shop[] = [];
    public categories: Category[] = [];

    constructor(
        private shopService: ShopService,
        private categoryService: CategoryService
    ) { }

    activateShop(shop: any): void {
        this.shopService.activateShop(shop.shopID).then(
            (claimID) => {
                this.getShops();
            }
        );
    }

    getShops(): void {
        this.shopService.getShops().then(
            aShops => { this.shops = aShops; }
        );
    }

    getCategories(): void {
        this.categoryService.getCategories().then(
            aCategories => { this.categories = aCategories; }
        );
    }

    getCategory(categoryRef: number): Category {
        let i: number,
            category = new Category();

        for (i = 0; i < this.categories.length; i++) {
            if (this.categories[i].categoryRef == categoryRef) {
                category = this.categories[i];
            }
        }

        return category;
    }

    ngOnInit(): void {
        this.getShops();
        this.getCategories();
    }
}
import { Component, OnInit } from '@angular/core';

import { Category } from '../../../backend/classes/category.class';
import { CategoryService } from '../../../backend/services/category.service';
import { Shop } from '../../../backend/classes/shop.class';
import { ShopService } from '../../../backend/services/shop.service';
import { PromisificationService } from '../../../common/services/promisification.service';

@Component({
    selector: 'kof-shops',
    templateUrl: 'shop-management.component.pug'
})
export class ShopManagementComponent implements OnInit {

    public shops: Shop[] = [];
    public categories: Category[] = [];

    private isLoading: boolean;
    private requests: Promise<any>[] = [];

    constructor(
        private shopService: ShopService,
        private categoryService: CategoryService,
        private promisificator: PromisificationService
    ) { }

    public activateShop(shop: any) {
        this.isLoading = true;

        this.shopService.activateShop(shop.shopID).then(() => {
            this.isLoading = false;

            this.promisificator.handleAsyncOperations(
                () => {
                    this.isLoading = true;
                    this.requests = [];
                },
                this.requests,
                [this.loadShops],
                () => {
                    this.isLoading = false;
                },
                this
            );
        });
    }

    public loadShops(requestsPromises: Array<any>) {
        let currentPromise: Promise<any>;

        currentPromise = this.shopService.getShops();

        if (requestsPromises) {
            requestsPromises.push(currentPromise);
        }

        currentPromise.then(aShops => {
            this.shops = aShops;
        });
    }

    public loadCategories(requestsPromises: Array<any>) {
        let currentPromise: Promise<any>;

        currentPromise = this.categoryService.getCategories();

        if (requestsPromises) {
            requestsPromises.push(currentPromise);
        }

        currentPromise.then(aCategories => {
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
        this.promisificator.handleAsyncOperations(
            () => {
                this.isLoading = true;
                this.requests = [];
            },
            this.requests,
            [this.loadShops, this.loadCategories],
            () => {
                this.isLoading = false;
            },
            this
        );
    }
}

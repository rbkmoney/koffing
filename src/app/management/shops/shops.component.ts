import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Category } from 'koffing/backend/backend.module';
import { HttpCategoryService } from 'koffing/backend/backend.module';
import { HttpShopService } from 'koffing/backend/backend.module';

@Component({
    templateUrl: 'shops.component.pug',
    styleUrls: ['./shops.component.less']
})
export class ShopsComponent implements OnInit {

    public shops: any[] = [];
    public categories: Category[] = [];
    public isLoading: boolean;
    public panelsVisibilities: {[key: number]: boolean} = {};

    constructor(
        private shopService: HttpShopService,
        private categoryService: HttpCategoryService,
    ) { }

    public ngOnInit() {
        this.loadData();
    }

    public loadData() {
        this.isLoading = true;
        Promise.all([
            this.loadShops(),
            this.loadCategories(),
        ]).then(() => {
            this.isLoading = false;
        });
    }

    public loadShops(): Promise<any[]> {
        this.panelsVisibilities = {};
        return new Promise((resolve) => {
            this.shopService.getShops().then(shops => {
                this.shops = shops;
                resolve();
            });
        });
    }

    public loadCategories(): Promise<Category[]> {
        return new Promise((resolve) => {
            this.categoryService.getCategories().then(categories => {
                this.categories = categories;
                resolve();
            });
        });
    }

    public isDetailsPanelVisible(panelIndex: number): boolean {
        if (!this.panelsVisibilities.hasOwnProperty(panelIndex)) {
            this.panelsVisibilities[panelIndex] = false;
        }
        return this.panelsVisibilities[panelIndex];
    }

    public showDetailsPanel(panelIndex: number) {
        this.panelsVisibilities[panelIndex] = !this.panelsVisibilities[panelIndex];
    }

    public getCategoryName(categoryID: number): string {
        if (this.categories.length > 0) {
            return (_.find(this.categories, (category: Category) => category.categoryID === categoryID)).name;
        }
    }
}

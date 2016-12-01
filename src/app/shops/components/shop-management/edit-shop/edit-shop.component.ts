import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

import { CategoryService } from '../../../../backend/services/category.service';
import { ShopService } from '../../../../backend/services/shop.service';
import { SelectItem } from '../../../../common/components/kof-select/kof-select.class';

@Component({
    selector: 'kof-edit-shop',
    templateUrl: './edit-shop.component.pug',
})
export class EditShopComponent implements OnInit {

    public categories: SelectItem[] = [];
    public currentShopId: string;
    public args: any = {
        shopDetails: {},
        contractor: {},
        categoryRef: null
    };

    private isLoading: boolean;
    private requests: Promise<any>[] = [];

    constructor(private categoryService: CategoryService,
                private shopService: ShopService,
                private router: Router,
                private route: ActivatedRoute) { }

    public loadShops(requestsPromises: Array<any>) {
        let currentPromise: Promise<any>;

        currentPromise = this.shopService.getShops();

        if (requestsPromises) {
            requestsPromises.push(currentPromise);
        }

        currentPromise.then((shops: any) => {
            const found: any = _.find(shops, (shop: any) => shop.shopID === this.currentShopId);
            this.args.shopDetails = found.shopDetails;
            this.args.contractor = found.contractor;
            this.args.categoryRef = found.categoryRef;
        });
    }

    public loadCategories(requestsPromises: Array<any>) {
        let currentPromise: Promise<any>;

        currentPromise = this.categoryService.getCategories();

        if (requestsPromises) {
            requestsPromises.push(currentPromise);
        }

        currentPromise.then(aCategories => {
            this.categories = _.map(aCategories, (cat: any) => new SelectItem(cat.categoryRef, cat.name));
        });
    }

    public hasError(field: any): boolean {
        return field.dirty && field.invalid;
    }

    public updateShop(form: any) {
        if (form.valid) {
            this.isLoading = true;

            this.shopService.updateShop(this.currentShopId, this.args).then(() => {
                this.isLoading = false;

                this.router.navigate(['/shops']);
            });
        }
    }

    public ngOnInit() {
        this.isLoading = true;
        this.requests = [];

        this.currentShopId = this.route.snapshot.params['shopID'];

        this.loadShops(this.requests);
        this.loadCategories(this.requests);

        Promise.all(this.requests).then(
            (results) => {
                this.isLoading = false;
            }
        );
    }
}

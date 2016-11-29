import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

import { CategoryService } from './../../../services/category/category.service';
import { ShopService } from './../../../services/shop/shop.service';
import { SelectItem } from '../../../common/kof-select/kof-select.class';

@Component({
    selector: 'kof-edit-shop',
    templateUrl: './edit-shop.component.pug',
    providers: [CategoryService, ShopService]
})

export class EditShopComponent implements OnInit {

    public categories: SelectItem[] = [];

    public currentShopId: string;

    public args: any = {
        shopDetails: {},
        contractor: {},
        categoryRef: null
    };

    constructor(private categoryService: CategoryService,
                private shopService: ShopService,
                private router: Router,
                private route: ActivatedRoute) { }

    public init() {
        this.currentShopId = this.route.snapshot.params['shopID'];
        this.shopService.getShops().then(shops => {
            const found = _.find(shops, shop => shop.shopID === this.currentShopId);
            this.args.shopDetails = found.shopDetails;
            this.args.contractor = found.contractor;
            this.args.categoryRef = found.categoryRef;
        });
    }

    public getCategories() {
        this.categoryService.getCategories().then(aCategories => {
            this.categories = _.map(aCategories, (cat: any) => new SelectItem(cat.categoryRef, cat.name));
        });
    }

    public hasError(field: any): boolean {
        return field.dirty && field.invalid;
    }

    public updateShop(form: any) {
        if (form.valid) {
            this.shopService.updateShop(this.currentShopId, this.args).then(() => {
                this.router.navigate(['/shops']);
            });
        }
    }

    public ngOnInit() {
        this.init();
        this.getCategories();
    }
}

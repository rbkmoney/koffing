import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CategoryService } from './../../../services/category/category.service';
import { ShopService } from './../../../services/shop/shop.service';
import { Category } from '../../../services/category/category.class';

@Component({
    selector: 'kof-add-shop',
    templateUrl: './add-shop.component.pug',
    providers: [CategoryService, ShopService]
})

export class AddShopComponent implements OnInit {

    public categories: Category[] = [];

    public args: any = {
        shopDetails: {},
        contractor: {},
        categoryRef: null
    };

    constructor(private categoryService: CategoryService,
                private shopService: ShopService,
                private router: Router) { }

    public getCategories() {
        this.categoryService.getCategories().then(aCategories => {
            this.categories = aCategories;
        });
    }

    public hasError(field: any): boolean {
        return field.dirty && field.invalid;
    }

    public createClaim(form: any) {
        if (form.valid) {
            this.args.contractor.legalEntity = '';
            this.shopService.createShop(this.args).then(() => {
                this.router.navigate(['/shops']);
            });
        }
    }

    public ngOnInit() {
        this.getCategories();
    }
}

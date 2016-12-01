import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { CategoryService } from '../../../../backend/services/category.service';
import { ShopService } from '../../../../backend/services/shop.service';
import { SelectItem } from '../../../../common/components/kof-select/kof-select.class';

@Component({
    selector: 'kof-add-shop',
    templateUrl: './add-shop.component.pug'
})

export class AddShopComponent implements OnInit {

    public categories: SelectItem[] = [];

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
            this.categories = _.map(aCategories, (cat: any) => new SelectItem(cat.categoryRef, cat.name));
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

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as _ from 'lodash';

import { CategoryService } from 'koffing/backend/backend.module';
import { Shop } from 'koffing/backend/backend.module';
import { ShopLocationUrl } from 'koffing/backend/backend.module';
import { CallbackHandler } from 'koffing/backend/backend.module';
import { Category } from 'koffing/backend/backend.module';
import { SelectItem } from 'koffing/common/common.module';
import { ShopTransfer } from './shop-transfer.class';

@Component({
    selector: 'kof-add-shop',
    templateUrl: 'add-shop.component.pug'
})

export class AddShopComponent implements OnInit {

    @Output()
    public onChange = new EventEmitter();
    
    public shop = new Shop();
    public categoryID: number;
    public shopLocationUrl: ShopLocationUrl = new ShopLocationUrl();
    public callbackHandler: CallbackHandler = new CallbackHandler();
    public categories: Category[] = [];
    public selectableCategories: SelectItem[] = [];
    public isLoading: boolean = false;
    private errorsHighlighted: boolean = false;

    constructor(
        private categoryService: CategoryService
    ) { }

    public ngOnInit() {
        this.isLoading = true;
        this.loadCategories().then((categories: Category[]) => {
            this.categories = categories;
            this.selectableCategories = _.chain(categories)
                .sortBy((category) => category.name)
                .map((category) => new SelectItem(category.categoryID, category.name))
                .value();
            this.categoryID = this.selectableCategories[0].value;
            this.isLoading = false;
        });
    }

    public loadCategories() {
        return new Promise((resolve) => {
            this.categoryService.getCategories().then((categories: Category[]) => {
                resolve(categories);
            });
        });
    }

    public highlightErrors() {
        this.errorsHighlighted = true;
    }

    public hasError(field: any): boolean {
        return (this.errorsHighlighted || field.dirty) && field.invalid;
    }

    public keyup(form: any) {
        this.shop.categoryID = Number(this.categoryID);
        this.shop.location = this.shopLocationUrl;
        this.shop.callbackHandler = this.callbackHandler;
        this.onChange.emit(new ShopTransfer(this.shop, form.valid));
    }

    public onCategoryChange(form: any) {
        this.keyup(form);
    }
}

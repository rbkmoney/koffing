import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from './../../../services/category/category.service';
import { Category } from './../../../services/category/category'
import { ShopService } from './../../../services/shop/shop.service';

@Component({
    selector: 'add-shop',
    templateUrl: './add-shop.component.pug',
    providers: [CategoryService, ShopService]
})

export class AddShopComponent implements OnInit {

    categories: Category[] = [];

    public args: any = {
        shopDetails: {},
        contractor: {},
        categoryRef: null
    };

    constructor(
        private categoryService: CategoryService,
        private shopService: ShopService,
        private router: Router
    ) { }

    getCategories(): void {
        this.categoryService.getCategories().then(
            aCategories => { this.categories = aCategories; }
        );
    }

    hasError(field: any): boolean {
        return field.dirty && field.invalid;
    }

    createClaim(form: any) : void {
        if (form.valid) {
            this.args.contractor.legalEntity = '';
            this.shopService.createShop(this.args).then(
                claimID => {
                    this.router.navigate(['/shops'])
                }
            );
        }
    }

    ngOnInit(): void {
        this.getCategories();
    }
}
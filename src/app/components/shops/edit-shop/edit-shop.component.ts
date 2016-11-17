import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../../services/category/category.service';
import { Category } from './../../../services/category/category'
import { ShopService } from './../../../services/shop/shop.service';
import * as _ from 'lodash';

@Component({
    selector: 'edit-shop',
    templateUrl: './edit-shop.component.pug',
    providers: [CategoryService, ShopService]
})

export class EditShopComponent implements OnInit {

    categories: Category[] = [];

    public currentShopId: string;

    public args: any = {
        shopDetails: {},
        contractor: {},
        categoryRef: null
    };

    constructor(
        private categoryService: CategoryService,
        private shopService: ShopService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    init(): void {
        this.currentShopId = this.route.snapshot.params['shopID'];

        this.shopService.getShops().then(shops => {
            let shop = _.find(shops, shop => shop.shopID === this.currentShopId);

            this.args.shopDetails = shop.shopDetails;
            this.args.contractor = shop.contractor;
            this.args.categoryRef = shop.categoryRef;
        })
    }

    getCategories(): void {
        this.categoryService.getCategories().then(
            aCategories => { this.categories = aCategories; }
        );
    }

    hasError(field: any): boolean {
        return field.dirty && field.invalid;
    }

    updateShop(form: any) : void {
        if (form.valid) {
            this.shopService.updateShop(this.currentShopId, this.args).then(
                claimID => {
                    this.router.navigate(['/shops'])
                }
            );
        }
    }

    ngOnInit(): void {
        this.init();
        this.getCategories();
    }
}
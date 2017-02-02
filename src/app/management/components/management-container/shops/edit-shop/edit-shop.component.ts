import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

import { CategoryService } from 'koffing/backend/backend.module';
import { ShopService } from 'koffing/backend/backend.module';
import { Shop } from 'koffing/backend/classes/shop.class';
import { Contract } from 'koffing/backend/classes/contract.class';
import { PayoutTool } from 'koffing/backend/classes/payout-tool.class';
import { ContractService } from 'koffing/backend/services/contract.service';
import { Category } from 'koffing/backend/classes/category.class';
import { SelectItem } from 'koffing/common/common.module';

@Component({
    selector: 'kof-edit-shop',
    templateUrl: './edit-shop.component.pug',
})
export class EditShopComponent implements OnInit {

    public shopID: number = Number(this.route.snapshot.params['shopID']);
    public shopEditing: Shop = new Shop();
    public shopContract: Contract = new Contract();
    public shopPayoutTool: PayoutTool = new PayoutTool();
    public categoryItems: SelectItem[] = [];
    public showContractDetails: boolean = false;
    public showPayoutAccountDetails: boolean = false;
    public isLoading: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private categoryService: CategoryService,
        private shopService: ShopService,
        private contractService: ContractService
    ) {}

    public ngOnInit() {
        this.isLoading = true;
        Promise.all([
            this.loadCategories(),
            this.loadShop()
        ]).then(() => {
            this.isLoading = false;
        });
    }

    public loadCategories(): Promise<Category[]> {
        return new Promise((resolve) => {
            this.categoryService.getCategories().then((categories: Category[]) => {
                this.categoryItems = _.map(categories, (category: any) => new SelectItem(category.categoryID, category.name));
                resolve();
            });
        });
    }
    
    public loadShop(): Promise<Shop> {
        return new Promise((resolve) => {
            this.shopService.getShop(this.shopID).then((shop: Shop) => {
                this.shopEditing = shop;
                console.log(shop);
                this.contractService.getContract(this.shopEditing.contractID).then((contract: Contract) => {
                    this.shopContract = contract;
                    console.log(contract);
                    resolve();
                });

            });
        });
    }

    // public loadDetails(contractID: number): Promise<any> {
    //     return new Promise((resolve) => {
    //         this.contractService.getContract(contractID).then((contract) => {
    //             this.shopContract = contract;
    //             resolve();
    //         });
    //     });
    // }

    public hasError(field: any): boolean {
        return field.dirty && field.invalid;
    }

    public updateShop(form: any) {
        console.log('updateShop');
        // if (form.valid) {
        //     this.isLoading = true;
        //     this.shopService.updateShop(this.shopID, this.args).then(() => {
        //         this.isLoading = false;
        //         this.router.navigate(['/management']);
        //     });
        // }
    }
}

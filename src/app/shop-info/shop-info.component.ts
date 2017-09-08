import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { Contract, Shop, PayoutTool } from 'koffing/backend';
import { Category } from 'koffing/backend/model/category';
import { ShopService } from 'koffing/backend/shop.service';
import { CategoryService } from 'koffing/backend/category.service';
import { ContractService } from 'koffing/backend/contract.service';
import { PayoutToolService } from 'koffing/backend/payout-tool.service';

@Component({
    templateUrl: 'shop-info.component.pug'
})
export class ShopInfoComponent implements OnInit {

    public shop: Shop;
    public category: Category;
    public contract: Contract;
    public payoutTool: PayoutTool;

    public isLoading: boolean;
    private shopEnrichment: Subject<null> = new Subject();
    private requestCount = 3;

    constructor(
        private route: ActivatedRoute,
        private shopService: ShopService,
        private categoryService: CategoryService,
        private contractService: ContractService,
        private payoutToolService: PayoutToolService
    ) { }

    public ngOnInit() {
        this.route.parent.params.subscribe((params) => {
            this.loadShop(params['shopID']);
        });
    }

    public getShopLabel(): string {
        return this.shop.isBlocked ? 'label-danger' : this.shop.isSuspended ? 'label-warning' : 'label-success';
    }

    public getShopStatus(): string {
        return this.shop.isBlocked ? 'Заблокирован' : this.shop.isSuspended ? 'Заморожен' : 'Активен';
    }

    public getContractLabel(): string {
        return this.contract.status === 'active' ? 'label-success' : 'label-danger';
    }

    public getContractStatus(): string {
        return this.contract.status === 'active' ? 'Активен' : 'Расторгнут';
    }

    public activateShop() {
        this.shopService.activateShop(this.shop.id).subscribe(() => {
            this.shop.isSuspended = !this.shop.isSuspended;
        });
    }

    public suspendShop() {
        this.shopService.suspendShop(this.shop.id).subscribe(() => {
            this.shop.isSuspended = !this.shop.isSuspended;
        });
    }

    private loadShop(shopID: string) {
        this.isLoading = true;
        this.shopService.getShopByID(shopID).subscribe((shop) => {
            this.shop = shop;
            this.loadCategory(shop.categoryID);
            this.loadContract(shop.contractID);
            this.loadPayoutTool(shop.contractID, shop.payoutToolID);

            const loadSubscription = this.shopEnrichment.skip(this.requestCount - 1).subscribe(() => {
                this.isLoading = false;
                loadSubscription.unsubscribe();
            });
        });
    }

    private loadCategory(categoryID: number) {
        this.categoryService.getCategoryByID(categoryID).subscribe((category) => {
            this.category = category;
            this.shopEnrichment.next();
        });
    }

    private loadContract(contractID: string) {
        this.contractService.getContractByID(contractID).subscribe((contract) => {
            this.contract = contract;
            this.shopEnrichment.next();
        });
    }

    private loadPayoutTool(contractID: string, payoutToolID: string) {
        this.payoutToolService.getPayoutToolByID(contractID, payoutToolID).subscribe((payoutTool) => {
            this.payoutTool = payoutTool;
            this.shopEnrichment.next();
        });
    }
}

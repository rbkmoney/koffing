import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {
    Claim, Shop, Contract, PayoutTool, ShopContractBinding, PartyModification,
    ContractPayoutToolCreation
} from 'koffing/backend';
import { ClaimService } from 'koffing/backend/claim.service';
import { ShopService } from 'koffing/backend/shop.service';

@Component({
    templateUrl: 'payout-tool-manage.component.pug'
})
export class PayoutToolManageComponent implements OnInit {

    public shop: Shop;
    public selectedPayoutTool: PayoutTool;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private shopService: ShopService,
        private claimService: ClaimService
    ) { }

    public ngOnInit() {
        this.route.parent.params.subscribe((params) => {
            this.loadShop(params.shopID);
        });
    }

    public loadShop(shopID: string) {
        this.shopService.getShopByID(shopID).subscribe((shop: Shop) => this.shop = shop);
    }

    public bindPayoutTool() {
        const shopContractBinding = new ShopContractBinding(this.shop.id, this.shop.contractID, this.selectedPayoutTool.id);
        this.claimService.createClaim([shopContractBinding]).subscribe((claim: Claim) => this.navigateToRoot());
    }

    public createAndBindPayoutTool(payoutToolCreation: ContractPayoutToolCreation) {
        const shopContractBinding = new ShopContractBinding(this.shop.id, payoutToolCreation.contractID, payoutToolCreation.payoutToolID);
        this.claimService.createClaim([payoutToolCreation, shopContractBinding]).subscribe((claim: Claim) => this.navigateToRoot());
    }

    public selectPayoutTool(payoutTool: PayoutTool) {
        this.selectedPayoutTool = payoutTool;
    }

    public navigateBack() {
        this.router.navigate(['shop', this.shop.id, 'info']);
    }

    public navigateToRoot() {
        this.router.navigate(['/']);
    }
}

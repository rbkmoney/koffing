import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/primeng';

import { Shop, Contract, PayoutTool, CLAIM_STATUS } from 'koffing/backend';
import { ShopService } from 'koffing/backend/shop.service';
import { ContractService } from 'koffing/backend/contract.service';
import { PayoutToolService } from 'koffing/backend/payout-tool.service';
import { CLAIM_TYPE } from 'koffing/common/claim-type';
import { ClaimSupportService } from 'koffing/common/claim-support.service';

@Component({
    templateUrl: 'shop-info.component.pug'
})
export class ShopInfoComponent implements OnInit {

    public shop: Shop;
    public contract: Contract;
    public payoutTool: PayoutTool;
    public messages: Message[] = [];
    public messageLifeTime: number = 1000;
    public isDisabledContractChange: boolean = true;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private shopService: ShopService,
        private contractService: ContractService,
        private payoutToolService: PayoutToolService,
        private claimSupportService: ClaimSupportService
    ) { }

    public ngOnInit() {
        this.route.parent.params.subscribe((params) => {
            this.loadShop(params['shopID']);
        });
        this.claimSupportService.checkExistenceClaim(CLAIM_STATUS.pending, CLAIM_TYPE.ShopContractBinding).subscribe((isExist) => {
            this.isDisabledContractChange = isExist;
        });
    }

    public navigateToContractChange() {
        this.router.navigate(['shop', this.shop.id, 'contract']);
    }

    public activateShop() {
        this.shopService.activateShop(this.shop.id).subscribe(() => {
            this.shop.isSuspended = !this.shop.isSuspended;
            this.showMessage('Магазин активирован');
        });
    }

    public suspendShop() {
        this.shopService.suspendShop(this.shop.id).subscribe(() => {
            this.shop.isSuspended = !this.shop.isSuspended;
            this.showMessage('Магазин заморожен');
        });
    }

    private loadShop(shopID: string) {
        this.shopService.getShopByID(shopID).subscribe((shop) => {
            this.shop = shop;
            this.loadContract(shop.contractID);
            this.loadPayoutTool(shop.contractID, shop.payoutToolID);
        });
    }

    private loadContract(contractID: string) {
        this.contractService.getContractByID(contractID).subscribe((contract) => {
            this.contract = contract;
        });
    }

    private loadPayoutTool(contractID: string, payoutToolID: string) {
        this.payoutToolService.getPayoutToolByID(contractID, payoutToolID).subscribe((payoutTool) => {
            this.payoutTool = payoutTool;
        });
    }

    private showMessage(message: string) {
        this.messages = [];
        this.messages.push({
            severity: 'success',
            summary: '',
            detail: message
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClaimService } from 'koffing/backend/services/claim.service';
import { Claim } from 'koffing/backend/classes/claim.class';
import { Contractor } from 'koffing/backend/classes/contractor.class';
import { PayoutToolBankAccount } from 'koffing/backend/classes/payout-tool-bank-account.class';
import { Shop } from 'koffing/backend/classes/shop.class';
import { ContractorTransfer } from 'koffing/management/components/management-container/shops/create-shop-wizard/selection-contract/create-contract/contractor-transfer.class';
import { PaytoolTransfer } from 'koffing/management/components/management-container/shops/create-shop-wizard/selection-paytool/create-paytool/paytool-transfer.class';
import { ShopDetailTransfer } from 'koffing/management/components/management-container/shops/create-shop-wizard/selection-shop-fields/add-shop/shop-detail-transfer.class';
import { PaytoolDecisionService } from 'koffing/management/components/management-container/shops/create-shop-wizard/selection-paytool/paytool-decision.service';
import { PaytoolDecision } from 'koffing/management/components/management-container/shops/create-shop-wizard/selection-paytool/paytool-decision.class';
import { CreateShopArgs } from 'koffing/backend/classes/create-shop-args.class';
import { ShopService } from 'koffing/backend/services/shop.service';

@Component({
    selector: 'kof-claims-edit',
    templateUrl: 'claims-edit.component.pug'
})
export class ClaimsEditComponent implements OnInit {

    public claimId: number;
    public contractor: Contractor;
    public payoutTool: PayoutToolBankAccount;
    public shop: Shop;
    public isLoading: boolean = false;
    private contractorReady: boolean;
    private paytoolReady: boolean;
    private shopReady: boolean;
    private formsTouched: boolean = false;

    constructor(
        private claimService: ClaimService,
        private router: Router,
        private paytoolDecisionService: PaytoolDecisionService,
        private shopService: ShopService
    ) { }

    public ngOnInit() {
        this.isLoading = true;
        this.claimService.getClaim({status: 'pending'}).then((claims: Claim[]) => {
            if (claims.length > 0) {
                this.claimId = claims[0].id;
                for (let set of claims[0].changeset) {
                    if (!set.hasOwnProperty('partyModificationType')) {
                        continue;
                    }
                    switch (set.partyModificationType) {
                        case 'ContractCreation':
                            this.contractor = <Contractor> set.contract.contractor;
                            this.contractorReady = true;
                            break;
                        case 'ContractModification':
                            if (set.contractModificationType === 'ContractPayoutToolCreation') {
                                this.payoutTool = <PayoutToolBankAccount> set.payoutTool.params;
                                this.paytoolReady = true;
                            }
                            break;
                        case 'ShopCreation':
                            this.shop = <Shop> set.shop;
                            this.shopReady = true;
                            break;
                        default:
                            break;
                    }
                }
            }
            this.isLoading = false;
        });
    }

    public onContractorChange(value: ContractorTransfer) {
        this.formsTouched = true;
        this.contractorReady = value.valid;
        if (value.valid) {
            this.contractor = value.contractor;
        }
    }

    public onPayoutToolChange(value: PaytoolTransfer) {
        this.formsTouched = true;
        this.paytoolReady = value.valid;
        if (value.valid) {
            this.payoutTool = value.payoutTool;
        }
    }

    public onShopFieldsChange(value: ShopDetailTransfer) {
        this.formsTouched = true;
        this.shopReady = value.valid;
        if (value.valid) {
            this.shop.details = value.shopDetail;
            this.shop.categoryID = value.categoryID;
            if (this.shop.callbackHandler) {
                this.shop.callbackHandler.url = value.callbackUrl;
            }
        }
    }

    public canSubmit(): boolean {
        let canSubmit = false;
        if (this.formsTouched) {
            canSubmit = this.contractorReady && this.paytoolReady;
            if (this.shop) {
                canSubmit = canSubmit && this.shopReady;
            }
        }
        return canSubmit;
    }

    public returnToManagement() {
        this.router.navigate(['/management']);
    }

    public saveChanges() {
        this.isLoading = true;
        this.claimService.revokeClaim(this.claimId, {
            reason: 'edit claim'
        }).then(() => {
            this.paytoolDecisionService.createContract(this.contractor, this.payoutTool).then((decision: PaytoolDecision) => {
                if (!this.shop) {
                    this.returnToManagement();
                } else {
                    this.shopService.createShop(new CreateShopArgs(
                        this.shop.categoryID,
                        this.shop.details,
                        decision.contractID,
                        decision.payoutToolID,
                        this.shop.callbackHandler ? this.shop.callbackHandler.url : undefined
                    )).then(() => {
                        this.returnToManagement();
                    });
                }
            });
        });
    }
}

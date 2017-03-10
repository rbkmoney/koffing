import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { ClaimService } from 'koffing/backend/services/claim.service';
import { Contractor } from 'koffing/backend/classes/contractor.class';
import { PayoutToolBankAccount } from 'koffing/backend/classes/payout-tool-bank-account.class';
import { Shop } from 'koffing/backend/classes/shop.class';
import { ContractorTransfer } from 'koffing/management/components/management-container/shops/create-shop-wizard/selection-contract/create-contract/contractor-transfer.class';
import { PaytoolTransfer } from 'koffing/management/components/management-container/shops/create-shop-wizard/selection-paytool/create-paytool/paytool-transfer.class';
import { ShopDetailTransfer } from 'koffing/management/components/management-container/shops/create-shop-wizard/selection-shop-fields/add-shop/shop-detail-transfer.class';
import { PaytoolDecisionService } from 'koffing/management/components/management-container/shops/create-shop-wizard/selection-paytool/paytool-decision.service';
import { PaytoolDecision } from 'koffing/management/components/management-container/shops/create-shop-wizard/selection-paytool/paytool-decision.class';
import { UpdateShopParams } from 'koffing/backend/classes/update-shop-params.class';
import { ShopService } from 'koffing/backend/services/shop.service';
import { Claim } from 'koffing/backend/classes/claim/claim.class';
import { ContractCreation } from 'koffing/backend/classes/claim/contract-creation.class';
import { ContractModification } from 'koffing/backend/classes/claim/contract-modification.class';
import { ContractPayoutToolCreation } from 'koffing/backend/classes/claim/contract-payout-tool-creation.class';
import { ShopCreation } from 'koffing/backend/classes/claim/shop-creation.class';
import { ShopModification } from 'koffing/backend/classes/claim/shop-modification.class';
import { ShopUpdate } from 'koffing/backend/classes/claim/shop-update.class';
import { ShopEditingTransfer } from 'koffing/management/components/management-container/shops/shop-editing/edit-shop/shop-editing-transfer.class';
import { EditableShop } from './editable-shop.class';

@Component({
    selector: 'kof-claims-edit',
    templateUrl: 'claims-edit.component.pug'
})
export class ClaimsEditComponent implements OnInit {

    public claimId: number;
    public contractor: Contractor;
    public payoutTool: PayoutToolBankAccount;
    public contractID: number;
    public shop: Shop;
    public editableShop: EditableShop;
    public shopChanges: UpdateShopParams;
    public isLoading: boolean = false;
    public showContent: boolean = false;
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
        this.getClaim();
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
    
    public onShopEditingChange(value: ShopEditingTransfer) {
        this.editableShop.valid = value.valid;
        this.editableShop.dirty = value.dirty;
        if (value.dirty) {
            this.formsTouched = true;
        }
        if (value.valid) {
            this.editableShop.updateShopParams = value.shopEditing;
        }
    }

    public canSubmit(): boolean {
        let canSubmit = false;
        if (this.formsTouched) {
            canSubmit = true;
            canSubmit = canSubmit && (this.contractor ? this.contractorReady : true);
            canSubmit = canSubmit && (this.payoutTool ? this.paytoolReady : true);
            canSubmit = canSubmit && (this.shop ? this.shopReady : true);
            if (this.editableShop) {
                if (!this.contractor && !this.payoutTool && !this.shop) {
                    canSubmit = canSubmit && this.editableShop.dirty && this.editableShop.valid;
                } else {
                    canSubmit = canSubmit && this.editableShop.valid;
                }
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
            if (this.contractor && !this.shop) {
                this.createContract().then(() => {
                    this.returnToManagement();
                });
            } else
            if (this.contractor && this.shop) {
                this.createContractAndShop().then(() => {
                    this.returnToManagement();
                });
            } else
            if (this.payoutTool && !this.contractor && !this.shop) {
                this.createPayoutTool().then(() => {
                    this.returnToManagement();
                });
            } else
            if (this.payoutTool && this.shop && !this.contractor) {
                this.createPaytoolAndShop().then(() => {
                    this.returnToManagement();
                });
            } else
            if (this.editableShop && !this.shop && !this.contractor) {
                this.updateShop().then(() => {
                    this.returnToManagement();
                });
            }
        });
    }

    private createShop(args: UpdateShopParams): Promise<any> {
        return new Promise((resolve) => {
            this.shopService.createShop(args).then(() => resolve());
        });
    }

    private createContract(): Promise<PaytoolDecision> {
        return new Promise((resolve) => {
            this.paytoolDecisionService.createContract(this.contractor, this.payoutTool).then((decision: PaytoolDecision) => {
                resolve(decision);
            });
        });
    }

    private createContractAndShop(): Promise<any> {
        return new Promise((resolve) => {
            this.paytoolDecisionService.createContract(this.contractor, this.payoutTool).then((decision: PaytoolDecision) => {
                this.createShop(new UpdateShopParams(
                    this.shop.categoryID,
                    this.shop.details,
                    decision.contractID,
                    decision.payoutToolID,
                    this.shop.callbackHandler ? this.shop.callbackHandler.url : undefined
                )).then(() => {
                    resolve();
                });
            });
        });
    }

    private createPayoutTool(): Promise<PaytoolDecision> {
        return new Promise((resolve) => {
            this.paytoolDecisionService.createPayoutTool(this.contractID, this.payoutTool).then((decision: PaytoolDecision) => {
                resolve(decision);
            });
        });
    }

    private createPaytoolAndShop(): Promise<any> {
        return new Promise((resolve) => {
            this.createPayoutTool().then((decision: PaytoolDecision) => {
                this.createShop(new UpdateShopParams(
                    this.shop.categoryID,
                    this.shop.details,
                    decision.contractID,
                    decision.payoutToolID,
                    this.shop.callbackHandler ? this.shop.callbackHandler.url : undefined
                )).then(() => {
                    resolve();
                });
            });
        });
    }

    private updateShop(): Promise<any> {
        return new Promise((resolve) => {
            this.shopService.updateShop(this.editableShop.shop.id, this.editableShop.updateShopParams).then(() => {
                resolve();
            });
        });
    }

    private showChildren(show: boolean) {
        this.showContent = show;
    }

    private handleClaim(claim: Claim) {
        let setCounter = claim.changeset.length;
        const setCountdown = () => {
            if (--setCounter === 0) {
                this.isLoading = false;
                _.delay(this.showChildren.bind(this, true), 0);
            }
        };

        this.claimId = claim.id;
        for (let set of claim.changeset) {
            switch (set.partyModificationType) {
                case 'ContractCreation': {
                    let currentSet: ContractCreation = <ContractCreation> set;
                    this.contractor = <Contractor> currentSet.contract.contractor;
                    this.contractorReady = true;
                    setCountdown();
                    break;
                }
                case 'ContractModification': {
                    let currentSet: ContractModification = <ContractModification> set;
                    if (currentSet.contractModificationType === 'ContractPayoutToolCreation') {
                        let currentSet: ContractPayoutToolCreation = <ContractPayoutToolCreation> set;
                        this.contractID = currentSet.contractID;
                        this.payoutTool = <PayoutToolBankAccount> currentSet.payoutTool.params;
                        this.paytoolReady = true;
                    }
                    setCountdown();
                    break;
                }
                case 'ShopCreation': {
                    let currentSet: ShopCreation = <ShopCreation> set;
                    this.shop = <Shop> currentSet.shop;
                    this.shopReady = true;
                    setCountdown();
                    break;
                }
                case 'ShopModification': {
                    let currentSet: ShopModification = <ShopModification> set;
                    if (currentSet.shopModificationType === 'ShopUpdate') {
                        let currentSet: ShopUpdate = <ShopUpdate> set;
                        this.shopChanges = currentSet.details;
                        this.shopService.getShop(currentSet.shopID).then((shop: Shop) => {
                            this.editableShop = new EditableShop();
                            _.assign(this.editableShop.shop, shop);
                            this.editableShop.shop.updateShop(currentSet.details);
                        });
                    }
                    setCountdown();
                    break;
                }
                default: {
                    setCountdown();
                    break;
                }
            }
        }
    }

    private getClaim() {
        this.isLoading = true;
        this.claimService.getClaim({status: 'pending'}).then((claims: Claim[]) => {
            if (claims.length > 0) {
                this.handleClaim(claims[0]);
            }
        });
    }
}

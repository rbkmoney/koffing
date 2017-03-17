import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { ClaimData } from 'koffing/management/classes/claim-data.class';
import { Claim } from 'koffing/backend/classes/claim/claim.class';
import { ContractCreation } from 'koffing/backend/classes/claim/contract-creation.class';
import { Contractor } from 'koffing/backend/classes/contractor.class';
import { ContractModification } from 'koffing/backend/classes/claim/contract-modification.class';
import { ContractPayoutToolCreation } from 'koffing/backend/classes/claim/contract-payout-tool-creation.class';
import { PayoutToolBankAccount } from 'koffing/backend/classes/payout-tool-bank-account.class';
import { ShopCreation } from 'koffing/backend/classes/claim/shop-creation.class';
import { Shop } from 'koffing/backend/classes/shop.class';
import { ShopModification } from 'koffing/backend/classes/claim/shop-modification.class';
import { ShopUpdate } from 'koffing/backend/classes/claim/shop-update.class';
import { ClaimService } from 'koffing/backend/services/claim.service';
import { ShopService } from 'koffing/backend/services/shop.service';
import { ShopParams } from 'koffing/backend/classes/shop-params.class';
import { PaytoolDecision } from 'koffing/management/components/management-container/shops/create-shop-wizard/selection-paytool/paytool-decision.class';
import { PayoutToolParams } from 'koffing/backend/classes/payout-tool-params.class';
import { PaytoolDecisionService } from 'koffing/management/components/management-container/shops/create-shop-wizard/selection-paytool/paytool-decision.service';
import { ShopEditingParams } from 'koffing/management/components/management-container/claims-edit/shop-editing-params.class';

@Injectable()
export class ClaimsEditService {

    constructor(
        private claimService: ClaimService,
        private shopService: ShopService,
        private paytoolDecisionService: PaytoolDecisionService
    ) { }

    public getClaimData(): Promise<ClaimData> {
        return new Promise((resolve) => {
            this.claimService.getClaim({status: 'pending'}).then((claims: Claim[]) => {
                if (claims.length > 0) {
                    this.handleClaim(claims[0]).then((claimData: ClaimData) => {
                        resolve(claimData);
                    });
                }
            });
        });
    }

    public saveChanges(claimData: ClaimData): Promise<any> {
        return new Promise((resolve, reject) => {
            this.claimService.revokeClaim(claimData.claimID, {
                reason: 'edit claim'
            }).then(() => {
                if (claimData.contractor && claimData.payoutToolParams && !claimData.shop) {
                    return this.createContract(claimData.contractor, claimData.payoutToolParams).then(() => {
                        resolve();
                    });
                } else if (claimData.contractor && claimData.payoutToolParams && claimData.shop) {
                    return this.createContractAndShop(claimData.contractor, claimData.payoutToolParams, claimData.shop).then(() => {
                        resolve();
                    });
                } else if (claimData.payoutToolParams && !claimData.contractor && !claimData.shop) {
                    return this.createPayoutTool(claimData.payoutToolContractId, claimData.payoutToolParams).then(() => {
                        resolve();
                    });
                } else if (claimData.payoutToolParams && claimData.shop && !claimData.contractor) {
                    return this.createPaytoolAndShop(claimData.payoutToolContractId, claimData.payoutToolParams, claimData.shop).then(() => {
                        resolve();
                    });
                } else if (claimData.shopEditingParams && !claimData.shop && !claimData.contractor) {
                    return this.updateShop(claimData.shopEditingParams.shop.id, claimData.shopEditingParams.updatedShopParams).then(() => {
                        resolve();
                    });
                } else {
                    reject();
                }
            });
        });
    }

    private createContract(contractor: Contractor, payoutToolParams: PayoutToolParams): Promise<PaytoolDecision> {
        return this.paytoolDecisionService.createContract(contractor, payoutToolParams);
    }

    private createContractAndShop(contractor: Contractor, payoutToolParams: PayoutToolParams, shop: Shop): Promise<any> {
        return this.paytoolDecisionService.createContract(contractor, payoutToolParams).then((decision: PaytoolDecision) => {
            return this.shopService.createShop(new ShopParams(
                shop.categoryID,
                shop.details,
                decision.contractID,
                decision.payoutToolID,
                shop.callbackHandler ? shop.callbackHandler.url : undefined
            ))
        });
    }

    private createPayoutTool(contractID: number, payoutToolsParams: PayoutToolParams): Promise<PaytoolDecision> {
        return this.paytoolDecisionService.createPayoutTool(contractID, payoutToolsParams);
    }

    private createPaytoolAndShop(contractID: number, payoutToolsParams: PayoutToolParams, shop: Shop): Promise<string> {
        return this.createPayoutTool(contractID, payoutToolsParams).then((decision: PaytoolDecision) => {
            return this.shopService.createShop(new ShopParams(
                shop.categoryID,
                shop.details,
                decision.contractID,
                decision.payoutToolID,
                shop.callbackHandler ? shop.callbackHandler.url : undefined
            ));
        });
    }

    private updateShop(shopID: number, updatedShopParams: ShopParams): Promise<string> {
        return this.shopService.updateShop(shopID, updatedShopParams);
    }

    private handleClaim(claim: Claim): Promise<ClaimData> {
        return new Promise((resolve) => {
            const claimData = new ClaimData();

            let setCounter = claim.changeset.length;
            const setCountdown = () => {
                if (--setCounter === 0) {
                    resolve(claimData);
                }
            };

            claimData.claimID = claim.id;
            for (let setItem of claim.changeset) {
                switch (setItem.partyModificationType) {
                    case 'ContractCreation': {
                        const currentSet: ContractCreation = <ContractCreation> setItem;
                        claimData.contractor = <Contractor> currentSet.contract.contractor;
                        setCountdown();
                        break;
                    }
                    case 'ContractModification': {
                        const currentSet: ContractModification = <ContractModification> setItem;
                        if (currentSet.contractModificationType === 'ContractPayoutToolCreation') {
                            const currentSet: ContractPayoutToolCreation = <ContractPayoutToolCreation> setItem;
                            claimData.payoutToolContractId = currentSet.contractID;
                            claimData.payoutToolParams = <PayoutToolBankAccount> currentSet.payoutTool.params;
                        }
                        setCountdown();
                        break;
                    }
                    case 'ShopCreation': {
                        const currentSet: ShopCreation = <ShopCreation> setItem;
                        claimData.shop = <Shop> currentSet.shop;
                        setCountdown();
                        break;
                    }
                    case 'ShopModification': {
                        const currentSet: ShopModification = <ShopModification> setItem;
                        if (currentSet.shopModificationType === 'ShopUpdate') {
                            const currentSet: ShopUpdate = <ShopUpdate> setItem;
                            claimData.shopEditingParams = new ShopEditingParams();
                            claimData.shopEditingParams.claimShopChanges = currentSet.details;
                            this.shopService.getShop(currentSet.shopID).then((shop: Shop) => {
                                _.assign(claimData.shopEditingParams.shop, shop);
                                claimData.shopEditingParams.shop.update(currentSet.details);
                                setCountdown();
                            });
                        } else {
                            setCountdown();
                        }
                        break;
                    }
                    default: {
                        setCountdown();
                        break;
                    }
                }
            }
        });
    }

}

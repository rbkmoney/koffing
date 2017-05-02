import { Injectable } from '@angular/core';

import { ClaimService } from 'koffing/backend/services/claim.service';
import { Shop } from 'koffing/backend/model/shop/shop.class';
import { Contract } from 'koffing/backend/model/contract/contract.class';
import { PayoutTool } from 'koffing/backend/model/contract/payout-tool.class';
import { PayoutToolBankAccount } from 'koffing/backend/model/contract/payout-tool-bank-account.class';
import { Claim } from 'koffing/backend/model/claim/claim.class';
import { PartyModification } from 'koffing/backend/model/claim/party-modification.class';
import { ContractCreation } from 'koffing/backend/model/claim/contract-modification/contract-creation.class';
import { ContractPayoutToolCreation } from 'koffing/backend/model/claim/contract-modification/contract-payout-tool-creation.class';
import { ShopCreation } from 'koffing/backend/model/claim/shop-modification/shop-creation.class';
import uuid from 'koffing/common/generators/uuid';

@Injectable()
export class ClaimsService {

    constructor(
        private claimService: ClaimService
    ) { }

    public createShop(shop: Shop, contract: Contract, payoutTool: PayoutTool): Promise<Claim> {
        return new Promise((resolve, reject) => {
            const changeSet: PartyModification[] = [];

            const contractCreation = this.getContractCreation(contract);
            const contractID = contract.id || contractCreation.contractID;
            if (!contract.id) {
                changeSet.push(contractCreation);
            }

            const contractPayoutToolCreation = this.getContractPayoutToolCreation(payoutTool, contractID);
            const payoutToolID = payoutTool.id || contractPayoutToolCreation.payoutToolID;
            if (!payoutTool.id) {
                changeSet.push(contractPayoutToolCreation);
            }

            const shopCreation = this.getShopCreation(shop, contractID, payoutToolID);
            changeSet.push(shopCreation);

            this.claimService.createClaim(changeSet).then((claim) => resolve(claim));
        });
    }

    public createContract(contract: Contract, payoutTool: PayoutTool): Promise<Claim> {
        return new Promise((resolve, reject) => {
            const contractCreation = this.getContractCreation(contract);
            const contractPayoutToolCreation = this.getContractPayoutToolCreation(payoutTool, contractCreation.contractID);

            const changeSet: PartyModification[] = [];
            changeSet.push(contractCreation, contractPayoutToolCreation);

            this.claimService.createClaim(changeSet).then((claim) => resolve(claim));
        });
    }

    public createPayoutTool(payoutTool: PayoutTool, contractID: string): Promise<Claim> {
        return new Promise((resolve, reject) => {
            const contractPayoutToolCreation = this.getContractPayoutToolCreation(payoutTool, contractID);

            const changeSet: PartyModification[] = [];
            changeSet.push(contractPayoutToolCreation);

            this.claimService.createClaim(changeSet).then((claim) => resolve(claim));
        });
    }

    private getContractCreation(contract: Contract): ContractCreation {
        const contractCreation = new ContractCreation();
        contractCreation.contractID = uuid();
        contractCreation.contractor = contract.contractor;
        return contractCreation;
    }

    private getContractPayoutToolCreation(payoutTool: PayoutTool, contractID: string): ContractPayoutToolCreation {
        const contractPayoutToolCreation = new ContractPayoutToolCreation();
        contractPayoutToolCreation.payoutToolID = uuid();
        contractPayoutToolCreation.contractID = contractID;
        contractPayoutToolCreation.currency = payoutTool.currency;
        if (payoutTool.details instanceof PayoutToolBankAccount) {
            contractPayoutToolCreation.bankAccount = payoutTool.details.bankAccount;
        }
        return contractPayoutToolCreation;
    }

    private getShopCreation(shop: Shop, contractID: string, payoutToolID: string): ShopCreation {
        const shopCreation = new ShopCreation();
        shopCreation.shopID = uuid();
        shopCreation.contractID = contractID;
        shopCreation.payoutToolID = payoutToolID;
        shopCreation.details = shop.details;
        shopCreation.location = shop.location;
        return shopCreation;
    }
}

import { Injectable } from '@angular/core';

import { HttpClaimService } from 'koffing/backend/backend.module';
import { Claim } from 'koffing/backend/backend.module';
import { Shop } from 'koffing/backend/backend.module';
import { Contract } from 'koffing/backend/backend.module';
import { PayoutToolBankAccount } from 'koffing/backend/backend.module';
import { PartyModification } from 'koffing/backend/backend.module';
import { ShopCreation } from 'koffing/backend/backend.module';
import { ContractCreation } from 'koffing/backend/backend.module';
import { ContractPayoutToolCreation } from 'koffing/backend/backend.module';
import uuid from 'koffing/common/generators/uuid';

@Injectable()
export class ClaimService {

    constructor(
        private httpClaimService: HttpClaimService
    ) { }

    private getContractCreation(contract: Contract): ContractCreation {
        const contractCreation = new ContractCreation();
        contractCreation.contractID = uuid();
        contractCreation.contractor = contract.contractor;
        return contractCreation;
    }

    private getContractPayoutToolCreation(payoutToolBankAccount: PayoutToolBankAccount, contractID: string): ContractPayoutToolCreation {
        const contractPayoutToolCreation = new ContractPayoutToolCreation();
        contractPayoutToolCreation.payoutToolID = uuid();
        contractPayoutToolCreation.contractID = contractID;
        contractPayoutToolCreation.currency = payoutToolBankAccount.currency;
        contractPayoutToolCreation.bankAccount = payoutToolBankAccount.bankAccount;
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

    public createShop(payoutToolBankAccount: PayoutToolBankAccount, contract: Contract, shop: Shop): Promise<Claim> {
        return new Promise((resolve, reject) => {
            const contractCreation = this.getContractCreation(contract);
            const contractPayoutToolCreation = this.getContractPayoutToolCreation(payoutToolBankAccount, contractCreation.contractID);
            const shopCreation = this.getShopCreation(shop, contractCreation.contractID, contractPayoutToolCreation.payoutToolID);

            const changeSet: PartyModification[] = [];
            changeSet.push(contractCreation, contractPayoutToolCreation, shopCreation);
            console.log(changeSet);

            this.httpClaimService.createClaim(changeSet).then((claim) => resolve(claim));
        });
    }

    public createContract(payoutToolBankAccount: PayoutToolBankAccount, contract: Contract): Promise<Claim> {
        return new Promise((resolve, reject) => {
            const contractCreation = this.getContractCreation(contract);
            const contractPayoutToolCreation = this.getContractPayoutToolCreation(payoutToolBankAccount, contractCreation.contractID);

            const changeSet: PartyModification[] = [];
            changeSet.push(contractCreation, contractPayoutToolCreation);

            this.httpClaimService.createClaim(changeSet).then((claim) => resolve(claim));
        });
    }

    public createPayoutTool(payoutToolBankAccount: PayoutToolBankAccount, contractID: string): Promise<Claim> {
        return new Promise((resolve, reject) => {
            const contractPayoutToolCreation = this.getContractPayoutToolCreation(payoutToolBankAccount, contractID);

            const changeSet: PartyModification[] = [];
            changeSet.push(contractPayoutToolCreation);

            this.httpClaimService.createClaim(changeSet).then((claim) => resolve(claim));
        });
    }
}

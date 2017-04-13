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

    // private getContractPayoutToolCreation(payoutToolBankAccount: PayoutToolBankAccount): ContractPayoutToolCreation {
    //     const contractPayoutToolCreation = new ContractPayoutToolCreation();
    //     contractPayoutToolCreation.payoutToolID = uuid();
    //     contractPayoutToolCreation.currency = payoutToolBankAccount.currency;
    //     contractPayoutToolCreation.bankAccount = payoutToolBankAccount.bankAccount;
    //     return contractPayoutToolCreation;
    // }

    public createShop(shop: Shop, contract: Contract, payoutToolBankAccount: PayoutToolBankAccount): Promise<Claim> {
        return new Promise((resolve, reject) => {
            const contractPayoutToolCreation = new ContractPayoutToolCreation();
            contractPayoutToolCreation.payoutToolID = uuid();
            contractPayoutToolCreation.currency = payoutToolBankAccount.currency;
            contractPayoutToolCreation.bankAccount = payoutToolBankAccount.bankAccount;

            const contractCreation = new ContractCreation();
            contractCreation.contractID = uuid();
            contractCreation.contractor = contract.contractor;

            const shopCreation = new ShopCreation();
            shopCreation.shopID = uuid();
            shopCreation.contractID = contractCreation.contractID;
            shopCreation.payoutToolID = contractPayoutToolCreation.payoutToolID;
            shopCreation.details = shop.details;
            shopCreation.location = shop.location;

            const changeSet: PartyModification[] = [];
            changeSet.push(contractPayoutToolCreation, contractCreation, shopCreation);
            console.log(changeSet);

            this.httpClaimService.createClaim(changeSet).then((claim: Claim) => resolve(claim));
        });
    }
}

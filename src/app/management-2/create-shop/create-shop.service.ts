import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ContractCreation } from 'koffing/backend/model/claim/party-modification/contract-modification/contract-creation';
import { RussianLegalEntity } from 'koffing/backend/model/contract/contractor/russian-legal-entity';
import { ContractPayoutToolCreation } from 'koffing/backend/model/claim/party-modification/contract-modification/contract-payout-tool-creation';
import { PayoutToolBankAccount } from 'koffing/backend/model/payout-tool/payout-tool-details/payout-tool-bank-account';
import { ShopCreation } from 'koffing/backend/model/claim/party-modification/shop-modification/shop-creation';
import { ShopLocationUrl } from 'koffing/backend/model/shop/shop-location/shop-location-url';
import { ShopDetails } from 'koffing/backend/model/shop/shop-details';

@Injectable()
export class CreateShopService {

    constructor(private fb: FormBuilder) { }

    public prepareContractForm(): FormGroup {
        return this.fb.group({
            registeredName: ['', Validators.required],
            registeredNumber: ['', Validators.required],
            inn: ['', Validators.required],
            postAddress: ['', Validators.required],
            actualAddress: ['', Validators.required],
            representativePosition: ['', Validators.required],
            representativeFullName: ['', Validators.required],
            representativeDocument: ['', Validators.required],
            bankAccount: this.prepareBankAccountForm()
        });
    }

    public prepareBankAccountForm(): FormGroup {
        return this.fb.group({
            account: ['', Validators.required],
            bankName: ['', Validators.required],
            bankPostAccount: ['', Validators.required],
            bankBik: ['', Validators.required]
        });
    }

    public prepareShopForm(): FormGroup {
        return this.fb.group({
            url: ['', Validators.required],
            name: ['', Validators.required],
            description: ''
        });
    }

    public toContractCreation(contractForm: FormGroup): ContractCreation {
        const contractor = new RussianLegalEntity(contractForm.value);
        return new ContractCreation(this.generateID(), contractor);
    }

    public toPayoutToolCreation(contractID: string, bankAccount: FormGroup): ContractPayoutToolCreation {
        const details = new PayoutToolBankAccount(bankAccount.value);
        return new ContractPayoutToolCreation(contractID, this.generateID(), details);
    }

    public toShopCreation(contractID: string, payoutToolID: string, shopForm: FormGroup): ShopCreation {
        const val = shopForm.value;
        return new ShopCreation({
            shopID: this.generateID(),
            location: new ShopLocationUrl(val.url),
            details: new ShopDetails(val.name, val.description),
            contractID, payoutToolID
        });
    }

    private generateID(): string {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }

        return `${s4()}${s4()}-${s4()}${s4()}-${s4()}${s4()}-${s4()}${s4()}`;
    }
}

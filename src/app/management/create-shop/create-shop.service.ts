import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import * as uuid from 'uuid/v4';

import {
    ShopCreation,
    ShopDetails,
    ShopLocationUrl,
    ContractCreation,
    ContractPayoutToolCreation,
    RussianLegalEntity,
    PayoutToolBankAccount,
    PartyModification
} from 'koffing/backend';
import {
    ContractFormService,
    PayoutToolFormService,
    ShopFormService,
} from 'koffing/domain';
import { ShopCreationStep } from 'koffing/management/create-shop/shop-creation-step';

@Injectable()
export class CreateShopService {

    public contractForm: FormGroup;
    public payoutToolForm: FormGroup;
    public shopForm: FormGroup;
    public changeSetEmitter: Subject<PartyModification[] | false> = new Subject();
    private changeSet: PartyModification[] = [];
    private contractID: string;
    private payoutToolID: string;

    constructor(
        private shopFormService: ShopFormService,
        private contractFormService: ContractFormService,
        private payoutToolFormService: PayoutToolFormService
    ) {
        this.shopForm = this.shopFormService.initForm();
        this.contractForm = this.contractFormService.initForm();
        this.payoutToolForm = this.payoutToolFormService.initForm();
        this.handleGroups();
    }

    private handleGroups() {
        this.handleStatus(this.contractForm, () => {
            const contractCreation = this.toContractCreation(this.contractForm);
            this.contractID = contractCreation.contractID;
            this.changeSet[ShopCreationStep.contract] = contractCreation;
        });
        this.handleStatus(this.payoutToolForm, () => {
            const payoutToolCreation = this.toPayoutToolCreation(this.contractID, this.payoutToolForm);
            this.payoutToolID = payoutToolCreation.payoutToolID;
            this.changeSet[ShopCreationStep.payoutTool] = payoutToolCreation;
        });
        this.handleStatus(this.shopForm, () => {
            this.changeSet[ShopCreationStep.shop] = this.toShopCreation(this.contractID, this.payoutToolID, this.shopForm);
        });
    }

    private handleStatus(group: FormGroup, doHandler: any) {
        group.statusChanges
            .do(doHandler)
            .subscribe((status) =>
                this.changeSetEmitter.next(status === 'VALID' ? this.changeSet : false));
    }

    private toContractCreation(contractForm: FormGroup): ContractCreation {
        const contractor = new RussianLegalEntity(contractForm.value);
        return new ContractCreation(uuid(), contractor);
    }

    private toPayoutToolCreation(contractID: string, payoutTool: FormGroup): ContractPayoutToolCreation {
        const payoutToolDetails = new PayoutToolBankAccount(payoutTool.value.bankAccount);
        return new ContractPayoutToolCreation(contractID, uuid(), payoutToolDetails);
    }

    private toShopCreation(contractID: string, payoutToolID: string, shopForm: FormGroup): ShopCreation {
        const shop = shopForm.value;
        return new ShopCreation({
            shopID: uuid(),
            location: new ShopLocationUrl(shop.url),
            details: new ShopDetails(shop.name, shop.description),
            contractID,
            payoutToolID
        });
    }
}

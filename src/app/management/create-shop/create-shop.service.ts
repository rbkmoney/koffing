import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

import { ContractFormService, PayoutToolFormService, ShopFormService } from 'koffing/domain';
import { PartyModification } from 'koffing/backend';
import { ShopCreationStep } from './shop-creation-step';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class CreateShopService {

    public contractForm: FormGroup;
    public payoutToolForm: FormGroup;
    public shopForm: FormGroup;
    public changeSetEmitter: Subject<PartyModification[] | boolean> = new Subject();
    private changeSet: PartyModification[] = [];
    private contractID: string;
    private payoutToolID: string;

    constructor(
        private shopFormService: ShopFormService,
        private contractFormService: ContractFormService,
        private payoutToolFormService: PayoutToolFormService,
        private route: ActivatedRoute
    ) {
        this.route.params.subscribe((params) => {
            this.shopForm = this.shopFormService.initForm();
            this.contractForm = this.contractFormService.initForm(params.type);
            this.payoutToolForm = this.payoutToolFormService.initForm(params.type);
            this.handleGroups();
        });
    }

    private handleGroups() {
        this.handleStatus(this.contractForm, () => {
            const contractCreation = this.contractFormService.toContractCreation(this.contractForm);
            this.contractID = contractCreation.contractID;
            this.changeSet[ShopCreationStep.contract] = contractCreation;
        });
        this.handleStatus(this.payoutToolForm, () => {
            const payoutToolCreation = this.payoutToolFormService.toPayoutToolCreation(this.contractID, this.payoutToolForm);
            this.payoutToolID = payoutToolCreation.payoutToolID;
            this.changeSet[ShopCreationStep.payoutTool] = payoutToolCreation;
        });
        this.handleStatus(this.shopForm, () => {
            this.changeSet[ShopCreationStep.shop] = this.shopFormService.toShopCreation(this.contractID, this.payoutToolID, this.shopForm);
        });
    }

    private handleStatus(group: FormGroup, doHandler: any) {
        group.statusChanges
            .do(doHandler)
            .subscribe((status) =>
                this.changeSetEmitter.next(status === 'VALID' ? this.changeSet : false));
    }
}

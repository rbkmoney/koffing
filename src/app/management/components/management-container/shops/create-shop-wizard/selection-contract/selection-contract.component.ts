import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as _ from 'lodash';

import { SelectionOptions } from '../selection-options.class';
import { WizardArgs } from 'koffing/management/management.module';
import { ContractService } from 'koffing/backend/services/contract.service';
import { ClaimService } from 'koffing/backend/backend.module';
import { Claim } from 'koffing/backend/classes/claim.class';
import { BankAccount } from 'koffing/backend/classes/bank-account.class';
import { RussianLegalEntity } from 'koffing/backend/classes/russian-legal-entity.class';
import { Contract } from 'koffing/backend/classes/contract.class';
import { Contractor } from 'koffing/backend/classes/contractor.class';

@Component({
    selector: 'kof-selection-contract',
    templateUrl: 'selection-contract.component.pug'
})
export class SelectionContractComponent implements OnInit {

    @Input()
    public args: WizardArgs;
    @Input()
    public contracts: Contract[];
    @Input()
    public showFinishButton: boolean = false;
    public selectedOption: SelectionOptions;
    public optionNew: number = SelectionOptions.New;
    public optionExisting: number = SelectionOptions.Existing;
    public isContractReady: boolean = false;
    public newContract: Contract;
    
    @Output()
    public steppedForward = new EventEmitter();
    @Output()
    public steppedBackward = new EventEmitter();

    constructor(
        private contractService: ContractService,
        private claimService: ClaimService
    ) { }

    public ngOnInit() {
        this.args.isNewContract = false;
        this.isContractReady = false;
    }

    public createNewContractInstance() {
        const bankAccountArgs = new BankAccount();
        const entityArgs = new RussianLegalEntity();
        this.newContract = new Contract();
        this.newContract.contractor = new Contractor();
        this.newContract.contractor.bankAccount = bankAccountArgs;
        this.newContract.contractor.legalEntity = entityArgs;
        this.isContractReady = false;
    }

    public newContractReady(params: any) {
        this.isContractReady = params.valid;
    }

    public contractSelected(params: any) {
        this.args.creatingShop.contractID = params.contract.id;
        this.isContractReady = true;
    }

    public selectOptionNew() {
        this.createNewContractInstance();
        this.selectedOption = this.optionNew;
    }

    public selectOptionExisting() {
        this.selectedOption = this.optionExisting;
        this.isContractReady = false;
    }

    public stepForward() {
        if (this.selectedOption === this.optionNew) {
            this.createContract();
        } else {
            this.confirmForward();
        }
    }

    public stepBackward() {
        this.confirmBackward();
    }

    private confirmForward() {
        this.steppedForward.emit();
    }

    private confirmBackward() {
        this.steppedBackward.emit();
    }

    private createContract() {
        this.args.isLoading = true;
        this.contractService.createContract(this.newContract.contractor).then(
            (result: any) => {
                this.claimService.getClaimById(result.claimID).then(
                    (claim: Claim) => {
                        this.args.isLoading = false;
                        let contractCreationChangeset = _.find(claim.changeset, (set) => {
                            return set.partyModificationType === 'ContractCreation';
                        });
                        this.args.creatingShop.contractID = contractCreationChangeset.contract.id;
                        this.args.isNewContract = true;
                        this.confirmForward();
                    }
                );
            }
        );
    }
}

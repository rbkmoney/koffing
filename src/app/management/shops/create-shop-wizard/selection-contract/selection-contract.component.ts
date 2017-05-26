import { Component, Output, EventEmitter, ViewChild } from '@angular/core';

import { SelectionOptions } from '../selection-options.class';
import { ContractDecision } from '../contract-decision.class';
import { ContractorTransfer } from './create-contract/contractor-transfer.class';
import { Contract } from 'koffing/backend/model/contract/contract.class';
import { CreateContractComponent } from './create-contract/create-contract.component';
import { SelectContractComponent } from './select-contract/select-contract.component';

@Component({
    selector: 'kof-selection-contract',
    templateUrl: 'selection-contract.component.pug'
})
export class SelectionContractComponent {

    @Output()
    public steppedForward = new EventEmitter();

    public selectedContract: Contract = new Contract();
    public selectedOption: SelectionOptions;
    public optionNew: number = SelectionOptions.New;
    public optionExisting: number = SelectionOptions.Existing;
    public isContractorValid: boolean = false;
    public contractDecision: ContractDecision = new ContractDecision();
    @ViewChild('createContractRef')
    private createContractComponent: CreateContractComponent;
    @ViewChild('selectContractRef')
    private selectContractComponent: SelectContractComponent;

    public onChangeContractor(value: ContractorTransfer) {
        this.isContractorValid = value.valid;
        this.selectedContract.contractor = value.contractor;
    }

    public onContractSelected(contract: Contract) {
        this.isContractorValid = true;
        this.selectedContract = contract;
    }

    public selectOptionNew() {
        this.isContractorValid = false;
        this.selectedOption = this.optionNew;
    }

    public selectOptionExisting() {
        this.isContractorValid = false;
        this.selectedOption = this.optionExisting;
    }

    public stepForward() {
        if (this.isContractorValid) {
            this.contractDecision.contract = this.selectedContract;
            this.steppedForward.emit(this.contractDecision);
        } else {
            if (this.selectedOption === this.optionNew) {
                this.createContractComponent.highlightErrors();
            } else if (this.selectedOption === this.optionExisting) {
                this.selectContractComponent.highlightErrors();
            }
        }
    }
}

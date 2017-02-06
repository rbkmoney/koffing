import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { SelectionOptions } from '../selection-options.class';
import { WizardArgs } from 'koffing/management/management.module';
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
    public isContractorReady: boolean = false;

    public contractor: Contractor;
    
    @Output()
    public steppedForward = new EventEmitter();
    @Output()
    public steppedBackward = new EventEmitter();

    public ngOnInit() {
        this.args.isNewContract = false;
    }

    public onContractorReady(contractor: Contractor) {
        this.isContractorReady = true;
        this.contractor = contractor;
    }

    public newContractReady(params: any) {
        this.isContractorReady = params.valid;
    }

    public contractSelected(params: any) {
        this.args.creatingShop.contractID = params.contract.id;
        this.isContractorReady = true;
    }

    public selectOptionNew() {
        this.selectedOption = this.optionNew;
    }

    public selectOptionExisting() {
        this.selectedOption = this.optionExisting;
        this.isContractorReady = false;
    }

    public stepForward() {
        if (this.isContractorReady) {
            this.steppedForward.emit(this.contractor);
        }
    }

    public stepBackward() {
        this.steppedBackward.emit();
    }
}

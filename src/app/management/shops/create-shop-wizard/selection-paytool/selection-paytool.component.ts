import { Component, Output, EventEmitter, Input, AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import * as _ from 'lodash';

import { PayoutTool } from 'koffing/backend/model/contract/payout-tool.class';
import { SelectionOptions } from '../selection-options.class';
import { ContractDecision } from '../contract-decision.class';
import { PayoutToolTransfer } from './create-paytool/paytool-transfer.class';
import { CreatePayoutToolComponent } from './create-paytool/create-paytool.component';
import { SelectPaytoolComponent } from './select-paytool/select-paytool.component';

@Component({
    selector: 'kof-selection-paytool',
    templateUrl: 'selection-paytool.component.pug'
})
export class SelectionPaytoolComponent implements AfterViewInit {

    @Input()
    public contractDecision: ContractDecision;

    @Output()
    public steppedForward = new EventEmitter();

    public selectedPayoutTool: PayoutTool = new PayoutTool();
    public selectedOption: SelectionOptions;
    public optionNew: number = SelectionOptions.New;
    public optionExisting: number = SelectionOptions.Existing;
    public isPayoutToolValid: boolean = false;
    public isLoading: boolean = false;

    @ViewChild('createPaytoolRef')
    private createPayoutToolComponent: CreatePayoutToolComponent;
    @ViewChild('selectPaytoolRef')
    private selectPaytoolComponent: SelectPaytoolComponent;

    constructor(
        private changeDetector: ChangeDetectorRef
    ) { }

    public ngAfterViewInit() {
        if (!_.isUndefined(this.contractDecision.contract.contractor)) {
            this.selectedOption = this.optionNew;
            this.changeDetector.detectChanges();
        }
    }

    public payoutToolChange(value: PayoutToolTransfer) {
        this.isPayoutToolValid = value.valid;
        this.selectedPayoutTool.details = value.payoutToolBankAccount;
    }

    public payoutToolSelect(payoutTool: PayoutTool) {
        this.isPayoutToolValid = true;
        this.selectedPayoutTool = payoutTool;
    }

    public selectOptionExisting() {
        this.isPayoutToolValid = false;
        this.selectedOption = this.optionExisting;
    }

    public selectOptionNew() {
        this.isPayoutToolValid = false;
        this.selectedOption = this.optionNew;
    }

    public stepForward() {
        if (this.isPayoutToolValid) {
            this.contractDecision.payoutTool = this.selectedPayoutTool;
            this.steppedForward.emit(this.contractDecision);
        } else {
            if (this.selectedOption === this.optionNew) {
                this.createPayoutToolComponent.highlightErrors();
            } else if (this.selectedOption === this.optionExisting) {
                this.selectPaytoolComponent.highlightErrors();
            }
        }
    }
}

import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

import { SelectionOptions } from './../selection-options.class';
import { WizardArgs } from 'koffing/management/management.module';
import { PayoutAccountService } from 'koffing/backend/services/payout-account.service';
import { Claim } from 'koffing/backend/classes/claim.class';
import { ClaimService } from 'koffing/backend/services/claim.service';
import {BankAccount} from "koffing/backend/classes/bank-account.class";
import {PayoutToolBankAccount} from "koffing/backend/classes/payout-tool-bank-account.class";
import {PayoutAccount} from "koffing/backend/classes/payout-account.class";

@Component({
    selector: 'kof-wizard-step-two',
    templateUrl: './wizard-step-two.component.pug'
})
export class WizardStepTwoComponent implements OnInit {

    public selectedOption: SelectionOptions;
    public optionNew: number = SelectionOptions.New;
    public optionExisting: number = SelectionOptions.Existing;
    public isPayoutAccountReady: boolean = false;

    @Output()
    public steppedForward = new EventEmitter();
    @Output()
    public steppedBackward = new EventEmitter();

    @Input()
    private wizardArgs: WizardArgs;

    constructor(
        private payoutAccountService: PayoutAccountService,
        private claimService: ClaimService
    ) { }

    public ngOnInit() {
        this.wizardArgs.isNewPayoutAccount = false;
        delete this.wizardArgs.payoutAccount;
        if (this.wizardArgs.isNewContract) {
            this.selectOptionNew();
        } else {
            this.removePayoutAccountInstance();
        }
    }

    public removePayoutAccountInstance() {
        delete this.wizardArgs.payoutAccount;
        this.isPayoutAccountReady = false;
    }

    public createNewPayoutAccountInstance() {
        let bankAccountArgs = new BankAccount();
        let payoutToolBankAccount = new PayoutToolBankAccount();
        payoutToolBankAccount.bankAccount = bankAccountArgs;
        this.wizardArgs.payoutAccount = new PayoutAccount();
        this.wizardArgs.payoutAccount.tool = payoutToolBankAccount;
        this.isPayoutAccountReady = false;
    }

    public selectOptionNew() {
        this.selectedOption = this.optionNew;
        this.createNewPayoutAccountInstance();
    }

    public selectOptionExisting() {
        this.selectedOption = this.optionExisting;
        this.removePayoutAccountInstance();
    }

    public newPayoutAccountReady(params: any) {
        this.isPayoutAccountReady = params.valid;
    }

    public payoutAccountSelected(params: any) {
        this.wizardArgs.payoutAccount = params.payoutAccount;
        this.isPayoutAccountReady = true;
    };

    public createPayoutAccount() {
        this.wizardArgs.isLoading = true;
        this.payoutAccountService.createPayoutAccount(this.wizardArgs.payoutAccount).then(
            (result: any) => {
                this.claimService.getClaimById(result.claimID).then(
                    (claim: Claim) => {
                        this.wizardArgs.isLoading = false;
                        let payoutAccountCreationChangeset = _.find(claim.changeset, (set) => {
                            return set.modificationType === 'PayoutAccountCreation';
                        });
                        this.wizardArgs.payoutAccount = payoutAccountCreationChangeset.payoutAccount;
                        this.wizardArgs.isNewPayoutAccount = true;
                        this.confirmForward();
                    }
                )
            }
        )
    }

    public stepForward() {
        debugger;
        if (this.selectedOption === this.optionNew) {
            this.createPayoutAccount();
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
}

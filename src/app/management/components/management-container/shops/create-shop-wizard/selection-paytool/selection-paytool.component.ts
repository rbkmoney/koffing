import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

import { SelectionOptions } from '../selection-options.class';
import { WizardArgs } from 'koffing/management/management.module';
import { Claim } from 'koffing/backend/classes/claim.class';
import { ClaimService } from 'koffing/backend/services/claim.service';
import { BankAccount } from 'koffing/backend/classes/bank-account.class';
import { PayoutToolBankAccount } from 'koffing/backend/classes/payout-tool-bank-account.class';
import { PayoutTool } from 'koffing/backend/classes/payout-tool.class';
import { ContractService } from 'koffing/backend/services/contract.service';

@Component({
    selector: 'kof-selection-paytool',
    templateUrl: 'selection-paytool.component.pug'
})
export class SelectionPaytoolComponent implements OnInit {

    @Input()
    public payoutTools: PayoutTool[];
    @Input()
    public showFinishButton: boolean = false;
    @Input()
    public args: WizardArgs;
    public selectedOption: SelectionOptions;
    public optionNew: number = SelectionOptions.New;
    public optionExisting: number = SelectionOptions.Existing;
    public isPayoutAccountReady: boolean = false;
    public newPayoutTool: PayoutTool;

    @Output()
    public steppedForward = new EventEmitter();
    @Output()
    public steppedBackward = new EventEmitter();

    constructor(
        private contractService: ContractService,
        private claimService: ClaimService
    ) { }

    public ngOnInit() {
        this.isPayoutAccountReady = false;

        if (this.args.isNewContract) {
            this.selectOptionNew();
        }
    }

    public createNewPayoutToolInstance() {
        const bankAccountArgs = new BankAccount();
        const payoutToolBankAccount = new PayoutToolBankAccount();
        payoutToolBankAccount.bankAccount = bankAccountArgs;
        this.newPayoutTool = new PayoutTool();
        this.newPayoutTool.params = payoutToolBankAccount;

        this.isPayoutAccountReady = false;
    }

    public selectOptionNew() {
        this.createNewPayoutToolInstance();
        this.selectedOption = this.optionNew;
    }

    public selectOptionExisting() {
        this.selectedOption = this.optionExisting;
        this.isPayoutAccountReady = false;
    }

    public newPayoutToolReady(params: any) {
        this.isPayoutAccountReady = params.valid;
    }

    public payoutToolSelected(params: any) {
        this.args.creatingShop.payoutToolID = params.payoutTool.id;

        this.isPayoutAccountReady = true;
    }

    public createPayoutAccount() {
        this.args.isLoading = true;
        this.contractService.createPayoutTool(this.args.creatingShop.contractID, this.newPayoutTool).then(
            (result: any) => {
                this.claimService.getClaimById(result.claimID).then(
                    (claim: Claim) => {
                        this.args.isLoading = false;
                        let payoutToolCreationChangeset = _.find(claim.changeset, (set) => {
                            return set.contractModificationType === 'ContractPayoutToolCreation';
                        });
                        this.args.creatingShop.payoutToolID = payoutToolCreationChangeset.payoutTool.id;
                        this.confirmForward();
                    }
                );
            }
        );
    }

    public stepForward() {
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

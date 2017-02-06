import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';

import { SelectionOptions } from '../selection-options.class';
import { WizardArgs } from 'koffing/management/management.module';
import { Claim } from 'koffing/backend/classes/claim.class';
import { ClaimService } from 'koffing/backend/services/claim.service';
import { PayoutToolBankAccount } from 'koffing/backend/classes/payout-tool-bank-account.class';
import { PayoutTool } from 'koffing/backend/classes/payout-tool.class';
import { ContractService } from 'koffing/backend/services/contract.service';
import { Contractor } from 'koffing/backend/classes/contractor.class';
import { ContractParams } from 'koffing/backend/classes/contract-params.class';

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
    @Input()
    public contractor: Contractor;

    public selectedOption: SelectionOptions;
    public optionNew: number = SelectionOptions.New;
    public optionExisting: number = SelectionOptions.Existing;
    public isPayoutAccountReady: boolean = false;
    public payoutToolsParams: PayoutToolBankAccount;

    @Output()
    public steppedForward = new EventEmitter();
    @Output()
    public steppedBackward = new EventEmitter();

    constructor(
        private contractService: ContractService,
        private claimService: ClaimService
    ) { }

    public ngOnInit() {
        // if (this.args.isNewContract) {
        //     this.selectOptionNew();
        // }
        this.selectOptionNew();
    }

    public onPayoutToolReady(payoutTool: PayoutToolBankAccount) {
        this.isPayoutAccountReady = true;
        this.payoutToolsParams = payoutTool;
    }

    public selectOptionNew() {
        this.selectedOption = this.optionNew;
    }

    public selectOptionExisting() {
        this.selectedOption = this.optionExisting;
        this.isPayoutAccountReady = false;
    }

    public payoutToolSelected(params: any) {
        this.args.creatingShop.payoutToolID = params.payoutTool.id;
        this.isPayoutAccountReady = true;
    }

    public createPayoutAccount() {
        this.args.isLoading = true;
        if (this.isPayoutAccountReady) {
            const contractParams = new ContractParams();
            contractParams.contractor = this.contractor;
            contractParams.payoutToolParams = this.payoutToolsParams;

            this.contractService.createContract(contractParams).then((result) => {
                this.claimService.getClaimById(result.claimID).then(
                    (claim: Claim) => {
                        this.args.isLoading = false;
                        console.log(claim);
                    }
                );
            });
        }

        // this.args.isLoading = true;
        // this.contractService.createPayoutTool(this.args.creatingShop.contractID, this.newPayoutTool).then(
        //     (result: any) => {
        //         this.claimService.getClaimById(result.claimID).then(
        //             (claim: Claim) => {
        //                 this.args.isLoading = false;
        //                 let payoutToolCreationChangeset = _.find(claim.changeset, (set) => {
        //                     return set.contractModificationType === 'ContractPayoutToolCreation';
        //                 });
        //                 this.args.creatingShop.payoutToolID = payoutToolCreationChangeset.payoutTool.id;
        //                 this.confirmForward();
        //             }
        //         );
        //     }
        // );
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

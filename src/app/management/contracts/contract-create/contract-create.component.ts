import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ClaimService } from 'koffing/management/claims/claim.service';
import { ClaimCreateBroadcaster } from 'koffing/broadcaster/services/claim-create.broadcaster.service';
import { Contract } from 'koffing/backend/backend.module';
import { Contractor } from 'koffing/backend/backend.module';
import { BankAccount } from 'koffing/backend/backend.module';
import { PayoutTool } from 'koffing/backend/backend.module';
import { PayoutToolBankAccount } from 'koffing/backend/backend.module';
import { ContractorTransfer } from 'koffing/management/shops/create-shop-wizard/selection-contract/create-contract/contractor-transfer.class';
import { PayoutToolTransfer } from 'koffing/management/shops/create-shop-wizard/selection-paytool/create-paytool/paytool-transfer.class';
import { CreatePayoutToolComponent } from 'koffing/management/shops/create-shop-wizard/selection-paytool/create-paytool/create-paytool.component';
import { CreateContractComponent } from 'koffing/management/shops/create-shop-wizard/selection-contract/create-contract/create-contract.component';

@Component({
    selector: 'kof-contract-create',
    templateUrl: 'contract-create.component.pug'
})
export class ContractCreateComponent {

    public isLoading: boolean = false;
    public isContractorReady: boolean = false;
    public contractor: Contractor;
    public contractorBankAccount: BankAccount;
    public isPayoutToolReady: boolean = false;
    public payoutToolBankAccount: PayoutToolBankAccount;
    @ViewChild('createPaytoolRef')
    private createPaytoolComponent: CreatePayoutToolComponent;
    @ViewChild('createContractRef')
    private createContractComponent: CreateContractComponent;

    constructor(
        private router: Router,
        private claimService: ClaimService,
        private claimCreateBroadcaster: ClaimCreateBroadcaster
    ) { }

    public onContractorChange(value: ContractorTransfer) {
        this.isContractorReady = value.valid;
        this.contractor = value.contractor;
        this.contractorBankAccount = value.contractor.bankAccount;
        this.createPaytoolComponent.compareAccounts();
    }

    public onPayoutToolChange(value: PayoutToolTransfer) {
        this.isPayoutToolReady = value.valid;
        this.payoutToolBankAccount = value.payoutToolBankAccount;
    }

    public createContract() {
        if (this.isContractorReady && this.isPayoutToolReady) {
            const contract = new Contract();
            contract.contractor = this.contractor;
            const payoutTool = new PayoutTool();
            payoutTool.currency = 'RUB';
            payoutTool.details = this.payoutToolBankAccount;
            this.isLoading = true;
            this.claimService.createContract(contract, payoutTool).then(() => {
                this.claimCreateBroadcaster.fire();
                this.isLoading = false;
                this.navigateBack();
            });
        } else {
            if (!this.isContractorReady) {
                this.createContractComponent.highlightErrors();
            }
            if (!this.isPayoutToolReady) {
                this.createPaytoolComponent.highlightErrors();
            }
        }
    }

    public navigateBack() {
        this.router.navigate(['/management/contracts']);
    }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ContractService } from 'koffing/backend/services/contract.service';
import { Contract } from 'koffing/backend/backend.module';
import { PayoutAccount } from 'koffing/backend/backend.module';

@Component({
    selector: 'kof-create-shop',
    templateUrl: 'create-shop.component.pug'
})
export class CreateShopComponent implements OnInit {

    public currentWizardStep: number;

    public stepOneVisited: boolean;
    public stepTwoVisited: boolean;
    public stepThreeVisited: boolean;

    public currentStrategy: string;
    public isNewContractCreated: boolean;

    public contracts: Contract[];
    public selectedContract: Contract;
    public newContract: Contract;
    public selectedPayoutAccount: PayoutAccount;
    public newPayoutAccount: PayoutAccount;

    public isLoading: boolean;

    constructor(
        private router: Router,
        private contractService: ContractService
    ) { }

    public ngOnInit() {
        this.initVariables();
        this.loadContracts();
    }

    public stepBackward() {
        if (this.currentWizardStep === 1) {
            this.router.navigate(['/management']);
            return;
        }

        this.currentWizardStep--;
    }

    public stepForward() {
        debugger;
        this.currentWizardStep++;
        if (this.currentWizardStep === 2) {
            this.isNewContractCreated = this.currentStrategy === 'new';

            this.stepTwoVisited = true;
        }
        if (this.currentWizardStep === 3) {
            this.stepThreeVisited = true;
        }
    }

    public setNewStrategy() {
        this.currentStrategy = 'new';
    }

    public setExistingStrategy() {
        this.currentStrategy = 'existing';
    }

    private initVariables() {
        this.currentWizardStep = 1;
        this.currentStrategy = 'no';
        this.stepOneVisited = true;
        this.stepTwoVisited = false;
        this.stepThreeVisited = false;
        this.isNewContractCreated = false;
        this.isLoading = false;
        this.newContract = new Contract();
        this.newPayoutAccount = new PayoutAccount();
    }

    private loadContracts() {
        this.isLoading = true;
        this.contractService.getContracts().then((contracts) => {
            this.contracts = contracts;
            this.isLoading = false;
        });
    }
}

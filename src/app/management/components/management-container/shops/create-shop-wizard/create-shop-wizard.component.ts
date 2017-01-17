import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ContractService } from 'koffing/backend/services/contract.service';
import { WizardSteps } from './wizard-steps.class';
import { WizardArgs } from 'koffing/management/management.module';

@Component({
    templateUrl: './create-shop-wizard.component.pug'
})
export class CreateShopWizardComponent implements OnInit {

    public currentWizardStep: WizardSteps;
    public wizardContractStep: number = WizardSteps.Contract;
    public wizardAccountStep: number = WizardSteps.PayoutAccount;
    public wizardShopDetailsStep: number = WizardSteps.ShopDetails;
    public stepOneVisited: boolean = true;
    public stepTwoVisited: boolean = false;
    public stepThreeVisited: boolean = false;
    public wizardArgs: WizardArgs = new WizardArgs();

    constructor(
        private router: Router,
        private contractService: ContractService
    ) { }    
    
    public returnToManagement() {
        this.router.navigate(['/management']);
    }

    public goToContractStep() {
        this.currentWizardStep = this.wizardContractStep;
    }

    public goToAccountStep() {
        this.currentWizardStep = this.wizardAccountStep;
        this.stepTwoVisited = true;
    }

    public goToShopDetailsStep() {
        this.currentWizardStep = this.wizardShopDetailsStep;
        this.stepThreeVisited = true;
    }

    public proceedToAccountStep() {
        this.goToAccountStep();
    }

    public proceedToShopDetailsStep() {
        this.goToShopDetailsStep();
    }

    public finishWizard() {

    }

    public returnToContractStep() {
        this.goToContractStep();
    }

    public returnToAccountStep() {
        this.goToAccountStep();
    }

    public ngOnInit() {
        this.wizardArgs.isLoading = false;
        this.currentWizardStep = this.wizardContractStep;
        this.loadContracts();
    }

    private loadContracts() {
        this.wizardArgs.isLoading = true;
        this.contractService.getContracts().then((contracts) => {
            this.wizardArgs.contracts = contracts;
            this.wizardArgs.isLoading = false;
        });
    }
}

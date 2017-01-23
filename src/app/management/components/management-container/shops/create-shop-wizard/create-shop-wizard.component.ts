import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { ContractService } from 'koffing/backend/services/contract.service';
import { WizardSteps } from './wizard-steps.class';
import { WizardArgs } from 'koffing/management/management.module';
import { ShopService } from 'koffing/backend/services/shop.service';

@Component({
    templateUrl: './create-shop-wizard.component.pug'
})
export class CreateShopWizardComponent implements OnInit {

    public currentWizardStep: WizardSteps;
    public wizardContractStep: number = WizardSteps.Contract;
    public wizardAccountStep: number = WizardSteps.PayoutAccount;
    public wizardShopDetailsStep: number = WizardSteps.ShopDetails;
    public wizardArgs: WizardArgs = new WizardArgs();

    constructor(
        private router: Router,
        private contractService: ContractService,
        private shopService: ShopService
    ) { }    
    
    public returnToManagement() {
        this.router.navigate(['/management']);
    }

    public proceedToAccountStep() {
        this.goToAccountStep();
    }

    public proceedToShopDetailsStep() {
        this.goToShopDetailsStep();
    }

    public finishWizard() {
        this.createClaim().then(() => {
            this.returnToManagement();
        });
    }

    public ngOnInit() {
        this.wizardArgs.isLoading = false;
        this.loadContracts();
        this.goToContractStep();
    }

    private loadContracts() {
        this.wizardArgs.isLoading = true;
        this.contractService.getContracts().then((contracts) => {
            this.wizardArgs.contracts = contracts;
            this.wizardArgs.isLoading = false;
        });
    }

    private goToContractStep() {
        this.currentWizardStep = this.wizardContractStep;
    }

    private goToAccountStep() {
        this.currentWizardStep = this.wizardAccountStep;
    }

    private goToShopDetailsStep() {
        this.currentWizardStep = this.wizardShopDetailsStep;
    }

    private createClaim(): Promise<any> {
        this.wizardArgs.isLoading = true;

        return new Promise((resolve) => {
            this.shopService.createShop(_.merge(
                this.wizardArgs.shopFields,
                { contractID: this.wizardArgs.contract.id },
                { payoutAccountID: this.wizardArgs.payoutAccount.id }
            )).then(() => {
                this.wizardArgs.isLoading = false;

                resolve();
            });
        });
    }
}

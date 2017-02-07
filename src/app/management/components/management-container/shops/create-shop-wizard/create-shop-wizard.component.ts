import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WizardArgs } from 'koffing/management/management.module';
import { ShopService } from 'koffing/backend/services/shop.service';
import { Shop } from 'koffing/backend/classes/shop.class';
import { CreateShopArgs } from 'koffing/backend/classes/create-shop-args.class';
import { ContractDecision } from 'koffing/management/components/management-container/shops/create-shop-wizard/selection-contract/contract-decision.class';
import { PaytoolDecision } from 'koffing/management/components/management-container/shops/create-shop-wizard/selection-paytool/paytool-decision.class';

@Component({
    templateUrl: 'create-shop-wizard.component.pug'
})
export class CreateShopWizardComponent implements OnInit {

    public currentStep: number;
    public contractStep: number = 1;
    public paytoolStep: number = 2;
    public shopDetailsStep: number = 3;
    public wizardArgs: WizardArgs;

    public contractDecision: ContractDecision;
    public payoutToolDecision: PaytoolDecision;

    constructor(
        private router: Router,
        private shopService: ShopService
    ) { }    
    
    public returnToManagement() {
        this.router.navigate(['/management']);
    }

    public goToContractStep() {
        this.currentStep = this.contractStep;
    }

    public goToPaytoolStep(contractDecision: ContractDecision) {
        this.currentStep = this.paytoolStep;
        this.contractDecision = contractDecision;
    }

    public goToShopDetailsStep(payoutToolDecision: PaytoolDecision) {
        this.payoutToolDecision = payoutToolDecision;
        this.currentStep = this.shopDetailsStep;
    }

    public finishWizard(createShopArgs: CreateShopArgs) {
        this.createShop(createShopArgs).then(() => {
            this.returnToManagement();
        });
    }

    public ngOnInit() {
        this.wizardArgs = new WizardArgs();
        this.wizardArgs.isLoading = false;
        this.wizardArgs.creatingShop = new Shop();
        this.goToContractStep();
    }

    private createShop(createShopArgs: CreateShopArgs): Promise<any> {
        this.wizardArgs.isLoading = true;
        return new Promise((resolve) => {
            this.shopService.createShop(createShopArgs).then(() => {
                this.wizardArgs.isLoading = false;
                resolve();
            });
        });
    }
}

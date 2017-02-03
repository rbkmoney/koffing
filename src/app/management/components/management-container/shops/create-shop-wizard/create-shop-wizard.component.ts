import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ContractService } from 'koffing/backend/services/contract.service';
import { WizardArgs } from 'koffing/management/management.module';
import { ShopService } from 'koffing/backend/services/shop.service';
import { Contract } from 'koffing/backend/classes/contract.class';
import { PayoutTool } from 'koffing/backend/classes/payout-tool.class';
import { Shop } from 'koffing/backend/classes/shop.class';

@Component({
    templateUrl: 'create-shop-wizard.component.pug'
})
export class CreateShopWizardComponent implements OnInit {

    public currentStep: number;
    public contractStep: number = 1;
    public paytoolStep: number = 2;
    public shopDetailsStep: number = 3;
    public wizardArgs: WizardArgs;
    public contracts: Contract[];
    public payoutTools: PayoutTool[];

    constructor(
        private router: Router,
        private contractService: ContractService,
        private shopService: ShopService
    ) { }    
    
    public returnToManagement() {
        this.router.navigate(['/management']);
    }

    public goToContractStep() {
        this.currentStep = this.contractStep;
    }

    public goToPaytoolStep() {
        this.loadShopPayoutTools().then(() => this.currentStep = this.paytoolStep);
    }

    public goToShopDetailsStep() {
        this.currentStep = this.shopDetailsStep;
    }

    public finishWizard() {
        this.createShop().then(() => {
            this.returnToManagement();
        });
    }

    public ngOnInit() {
        this.wizardArgs = new WizardArgs();
        this.wizardArgs.isLoading = false;
        this.wizardArgs.creatingShop = new Shop();
        this.loadContracts();
        this.goToContractStep();
    }

    public loadContracts() {
        this.wizardArgs.isLoading = true;
        this.contractService.getContracts().then((contracts) => {
            this.contracts = contracts;
            this.wizardArgs.isLoading = false;
        });
    }

    public loadShopPayoutTools(): Promise<PayoutTool[]> {
        return new Promise((resolve) => {
            this.wizardArgs.isLoading = true;

            this.contractService.getPayoutTools(this.wizardArgs.creatingShop.contractID).then((payoutTools: PayoutTool[]) => {
                this.payoutTools = payoutTools;

                this.wizardArgs.isLoading = false;

                resolve();
            });
        });
    }

    private createShop(): Promise<any> {
        this.wizardArgs.isLoading = true;

        return new Promise((resolve) => {
            this.shopService.createShop(this.wizardArgs.creatingShop).then(() => {
                this.wizardArgs.isLoading = false;

                resolve();
            });
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ContractService } from 'koffing/backend/services/contract.service';
import { WizardArgs } from 'koffing/management/management.module';
import { ShopService } from 'koffing/backend/services/shop.service';
import { Contract } from 'koffing/backend/classes/contract.class';
import { Shop } from 'koffing/backend/classes/shop.class';
import { Contractor } from 'koffing/backend/classes/contractor.class';
import { CreateShopArgs } from 'koffing/backend/classes/create-shop-args.class';

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
    // public payoutTools: PayoutTool[];

    public contractor: Contractor;
    public contractId: number;
    public payoutToolId: number;

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

    public goToPaytoolStep(contractor: Contractor) {
        this.currentStep = this.paytoolStep;
        this.contractor = contractor;
        // this.loadShopPayoutTools().then(() => this.currentStep = this.paytoolStep);

    }

    public goToShopDetailsStep(ids: any) {
        this.contractId = ids.contractId;
        this.payoutToolId = ids.payoutToolId;
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

    // public loadShopPayoutTools(): Promise<PayoutTool[]> {
    //     return new Promise((resolve) => {
    //         this.wizardArgs.isLoading = true;
    //
    //         this.contractService.getPayoutTools(this.wizardArgs.creatingShop.contractID).then((payoutTools: PayoutTool[]) => {
    //             this.payoutTools = payoutTools;
    //
    //             this.wizardArgs.isLoading = false;
    //
    //             resolve();
    //         });
    //     });
    // }

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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ContractDecision } from './contract-decision.class';

@Component({
    templateUrl: 'create-shop-wizard.component.pug',
    styleUrls: [` 
        .wizard_steps {
            padding-left: 0;
        }
        .wizard_horizontal ul.wizard_steps li {
            width: 33%;
            display: table-cell!important;
        }
    `]
})
export class CreateShopWizardComponent implements OnInit {

    public currentStep: number;
    public contractStep: number = 1;
    public payoutToolStep: number = 2;
    public shopDetailsStep: number = 3;

    public contractDecision: ContractDecision;

    constructor(
        private router: Router
    ) { }

    public ngOnInit() {
        this.currentStep = this.contractStep;
    }
    
    public returnToManagement() {
        this.router.navigate(['/management']);
    }

    public goToPayoutToolStep(contractDecision: ContractDecision) {
        this.currentStep = this.payoutToolStep;
        this.contractDecision = contractDecision;
    }

    public goToShopDetailsStep(contractDecision: ContractDecision) {
        this.currentStep = this.shopDetailsStep;
        this.contractDecision = contractDecision;
    }

    public finishWizard() {
        this.returnToManagement();
    }
}

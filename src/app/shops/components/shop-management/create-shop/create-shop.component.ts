import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'kof-create-shop',
    templateUrl: './create-shop.component.pug'
})
export class CreateShopComponent implements OnInit {

    public currentWizardStep: number;

    public stepOneVisited: boolean = true;
    public stepTwoVisited: boolean = false;
    public stepThreeVisited: boolean = false;

    public currentStrategy: string;
    public isNewContractCreated: boolean = false;

    constructor(

    ) { }

    public ngOnInit() {
        this.currentWizardStep = 1;
        this.currentStrategy = 'no';
    }

    public stepBack() {
        this.currentWizardStep--;
    }

    public stepForward() {
        this.currentWizardStep++;
        if (this.currentWizardStep === 2) {
            if (this.currentStrategy === 'new') {
                this.isNewContractCreated = true;
            } else {
                this.isNewContractCreated = false;
            }

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
}

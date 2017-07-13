import { Component, OnInit } from '@angular/core';

import { CreateShopService } from './create-shop.service';
import { ShopCreationStep } from './shop-creation-step';
import { ClaimService } from 'koffing/backend/claim.service';
import { PartyModification } from 'koffing/backend/model/claim/party-modification/party-modification';
import { FormResolver } from 'koffing/management-2/create-shop/form-resolver.service';

@Component({
    templateUrl: 'create-shop.component.pug',
    providers: [
        CreateShopService,
        ClaimService,
        FormResolver
    ],
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
export class CreateShopComponent implements OnInit {

    public validStep = false;
    public step = ShopCreationStep;
    public currentStep = ShopCreationStep.contract;
    public contractGroup = this.createShopService.contractGroup;
    public payoutToolGroup = this.createShopService.payoutToolGroup;
    public shopGroup = this.createShopService.shopGroup;
    private changeset: PartyModification[];

    constructor(private claimService: ClaimService,
                private createShopService: CreateShopService) { }

    public ngOnInit() {
        this.createShopService.changesetEmitter.subscribe((changeset) => {
            this.changeset = changeset;
            this.validStep = !!changeset[this.currentStep]; // TODO fix it
        });
    }

    public next() {
        this.validStep = false;
        this.currentStep = this.currentStep + 1;
    }

    public prev() {
        this.currentStep = this.currentStep - 1;
    }

    public createClaim() {
        console.log(this.changeset);
        this.claimService.createClaim(this.changeset);
    }
}

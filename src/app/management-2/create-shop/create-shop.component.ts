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
    ]
})
export class CreateShopComponent implements OnInit {

    public validStep = false;
    public step = ShopCreationStep;
    public currentStep = ShopCreationStep.contract;
    public payoutToolGroup = this.createShopService.payoutToolGroup;
    private changeset: PartyModification[];

    constructor(private claimService: ClaimService,
                private createShopService: CreateShopService) { }

    public ngOnInit() {
        this.createShopService.changesetEmitter.subscribe((changeset) => {
            this.changeset = changeset;
            this.validStep = !!changeset[this.currentStep];
        });
    }

    public next() {
        this.validStep = false;
        this.currentStep = this.currentStep + 1;
    }

    public createClaim() {
        console.log(this.changeset);
        this.claimService.createClaim(this.changeset);
    }
}

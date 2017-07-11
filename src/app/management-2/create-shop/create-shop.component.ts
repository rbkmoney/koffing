import { Component } from '@angular/core';

import { CreateShopService } from './create-shop.service';
import { ShopCreationStep } from './shop-creation-step';
import { ClaimService } from 'koffing/backend/claim.service';
import { PartyModification } from 'koffing/backend/model/claim/party-modification/party-modification';

@Component({
    templateUrl: 'create-shop.component.pug',
    providers: [CreateShopService, ClaimService]
})
export class CreateShopComponent {

    public valid = false;

    public step = ShopCreationStep;

    public currentStep = ShopCreationStep.contract;

    private claimChangeset: PartyModification[] = [ , , ];

    constructor(private claimService: ClaimService) {}

    public next() {
        this.valid = false;
        this.currentStep = this.currentStep + 1;
    }

    public createClaim() {
        this.claimService.createClaim(this.claimChangeset);
    }

    public onStatusChange(value: false | PartyModification) {
        if (value) {
            this.valid = true;
            this.claimChangeset[this.currentStep] = value;
        } else {
            this.valid = false;
        }
    }
}

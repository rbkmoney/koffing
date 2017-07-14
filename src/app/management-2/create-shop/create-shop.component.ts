import { Component, OnInit } from '@angular/core';

import { CreateShopService } from './create-shop.service';
import { ShopCreationStep } from './shop-creation-step';
import { ClaimService } from 'koffing/backend/claim.service';
import { PartyModification } from 'koffing/backend/model/claim/party-modification/party-modification';
import { FormResolver } from './form-resolver.service';

@Component({
    templateUrl: 'create-shop.component.pug',
    providers: [
        CreateShopService,
        ClaimService,
        FormResolver
    ],
    styleUrls: ['create-shop.component.less']
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
            this.validStep = this.isValid();
        });
    }

    public next() {
        this.currentStep = this.currentStep + 1;
        this.validStep = this.isValid();
    }

    public prev() {
        this.currentStep = this.currentStep - 1;
        this.validStep = this.isValid();
    }

    public createClaim() {
        console.log(this.changeset);
        this.claimService.createClaim(this.changeset).subscribe((result) => console.log(result));
    }

    private isValid(): boolean {
        return !!this.changeset[this.currentStep];
    }
}

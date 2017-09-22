import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BreadcrumbBroadcaster } from 'koffing/broadcaster';
import { ClaimSupportService } from 'koffing/common/claim-support.service';
import { ClaimService } from 'koffing/backend/claim.service';
import {
    Claim,
    ContractCreation,
    ContractPayoutToolCreation,
    ShopContractBinding,
    ShopCreation
} from 'koffing/backend';
import { ClaimDetailsService } from './claim-details.service';

@Component({
    templateUrl: 'claim-details.component.pug',
    providers: [ClaimDetailsService]
})
export class ClaimDetailsComponent implements OnInit {

    public claim: Claim;
    public contractCreations: ContractCreation[];
    public contractPayoutToolCreations: ContractPayoutToolCreation[];
    public shopCreations: ShopCreation[];
    public contractBindings: ShopContractBinding[];
    public claimLabel: string;

    constructor(
        private route: ActivatedRoute,
        private claimService: ClaimService,
        private claimDetailsService: ClaimDetailsService,
        private claimSupportService: ClaimSupportService,
        private breadcrumbBroadcaster: BreadcrumbBroadcaster
    ) { }

    public ngOnInit() {
        const claimID = this.route.snapshot.params['claimID'];
        this.claimService.getClaimByID(claimID).subscribe((claim) => {
            this.claim = claim;
            this.claimLabel = this.claimSupportService.getClaimLabel(claim);
            this.contractCreations = this.claimDetailsService.toContractCreations(claim.changeset);
            this.contractPayoutToolCreations = this.claimDetailsService.toContractPayoutToolCreations(claim.changeset);
            this.shopCreations = this.claimDetailsService.toShopCreation(claim.changeset);
            this.contractBindings = this.claimDetailsService.toContractBinding(claim.changeset);
        });
        this.breadcrumbBroadcaster.fire([{label: 'Детали заявки'}]);
    }
}

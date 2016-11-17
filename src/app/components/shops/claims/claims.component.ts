import { Component, OnInit } from '@angular/core';
import { ShopCreationComponent } from './shop-creation/shop-creation.component';
import { ShopModificationComponent } from './shop-modification/shop-modification.component';
import { Claim } from './../../../services/claim/claim';
import { ClaimService } from './../../../services/claim/claim.service';

@Component({
    selector: 'claims',
    templateUrl: './claims.component.pug',
    providers: [
        ClaimService
    ]
})

export class ClaimsComponent implements OnInit {
    public claim: Claim;
    public changeset: any[];
    public showClaimInfo: boolean = false;

    constructor(
        private claimService: ClaimService
    ) { }

    getClaim(): void {
        this.claimService.getClaim().then(
            aClaim => {
                this.claim = aClaim;
                this.changeset = aClaim.changeset;
                this.showClaimInfo = true;
            }
        )
    }

    revoke(): void {
        let revokeDetails = {
            reason: 'test' //TODO: реализовать
        };

        this.claimService.revokeClaim(this.claim.id, revokeDetails).then(
            (statusText) => {
                this.showClaimInfo = false;
            }
        );
    }

    ngOnInit(): void {
        this.getClaim();
    }
}
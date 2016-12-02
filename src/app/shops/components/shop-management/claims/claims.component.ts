import { Component, OnInit } from '@angular/core';

import { Claim } from 'kof-modules/backend/classes/claim.class';
import { ClaimService } from 'kof-modules/backend/services/claim.service';

@Component({
    selector: 'kof-claims',
    templateUrl: './claims.component.pug'
})
export class ClaimsComponent implements OnInit {

    public claim: Claim;

    public changeset: any[];

    public showClaimInfo: boolean = false;

    constructor(private claimService: ClaimService) { }

    public getClaim() {
        this.claimService.getClaim().then((aClaim: Claim) => {
                this.claim = aClaim;
                this.changeset = aClaim.changeset;
                this.showClaimInfo = true;
            }
        );
    }

    public revoke() {
        let revokeDetails = {
            // TODO: реализовать
            reason: 'test'
        };

        this.claimService.revokeClaim(this.claim.id, revokeDetails).then(() => {
            this.showClaimInfo = false;
        });
    }

    public ngOnInit() {
        this.getClaim();
    }
}

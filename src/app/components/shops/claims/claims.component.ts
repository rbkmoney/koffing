import { Component, OnInit } from '@angular/core';

import { ClaimService } from './../../../services/claim/claim.service';
import { Claim } from '../../../services/claim/claim.class';

@Component({
    selector: 'kof-claims',
    templateUrl: './claims.component.pug',
    providers: [
        ClaimService
    ]
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

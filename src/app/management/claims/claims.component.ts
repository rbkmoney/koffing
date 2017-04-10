import { Component, OnInit } from '@angular/core';

import { ClaimReceiveBroadcaster } from 'koffing/broadcaster/services/claim-receive.broadcaster.service';
import { ClaimRevokeBroadcaster } from 'koffing/broadcaster/services/claim-revoke-broadcaster.service';
import { Claim } from 'koffing/backend/classes/claim.class';
import { ClaimService } from 'koffing/backend/services/claim.service';

@Component({
    selector: 'kof-claims',
    templateUrl: 'claims.component.pug'
})
export class ClaimsComponent implements OnInit {

    public claims: Claim[];
    public claim: Claim;
    public selectedClaim: Claim;
    public changeset: any[];
    public revokeReason: string;
    public isShowClaimInfo: boolean = false;

    constructor(
        private claimService: ClaimService,
        private claimReceiveBroadcaster: ClaimReceiveBroadcaster,
        private claimRevokeBroadcaster: ClaimRevokeBroadcaster
    ) { }

    public ngOnInit() {
        this.claimReceiveBroadcaster.on().subscribe(() => {
            this.getClaims();
        });
        this.getClaims();
    }

    public getClaims() {
        this.claimService.getClaims({status: 'pending'}).then((claims: Claim[]) => {
            if (claims.length > 0) {
                console.log(claims);
                this.claims = claims;

                this.claim = claims[0];
                this.changeset = this.claim.changeset;

                this.isShowClaimInfo = true;
            }
        });
    }

    public selectClaim(claim: Claim) {
        if (this.selectedClaim === claim) {
            this.selectedClaim = new Claim();
        } else {
            this.selectedClaim = claim;
        }
    }

    public revoke(reasonControl: any) {
        if (!reasonControl.valid) {
            return;
        }

        this.claimService.revokeClaim(this.claim.id, this.revokeReason).then(() => {
            // todo claimRevokeBroadcaster
            this.claimRevokeBroadcaster.fire();
        });
    }
}

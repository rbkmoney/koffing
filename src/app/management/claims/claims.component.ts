import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash'

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
    public revokeReason: string;
    public isShowClaimPanel: boolean = false;
    public changeSets: any[] = [];

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
                this.claims = claims;
                console.log(claims);
                // _.forEach(claims, (claim) => {
                //     _.forEach(claim.changeset, (changeset) => {
                //         this.changeSets.push(changeset);
                //     });
                // });
                // console.log(this.changeSets);

                this.isShowClaimPanel = true;
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

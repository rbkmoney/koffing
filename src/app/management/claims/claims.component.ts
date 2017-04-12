import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { ClaimReceiveBroadcaster } from 'koffing/broadcaster/services/claim-receive.broadcaster.service';
import { ClaimRevokeBroadcaster } from 'koffing/broadcaster/services/claim-revoke-broadcaster.service';
import { Claim } from 'koffing//backend/model/claim/claim.class';
import { ClaimService } from 'koffing/backend/services/claim.service';
import { PartyModification } from 'koffing/backend/model/claim/party-modification.class';
import { ShopModification } from 'koffing/backend/model/claim/shop-modification.class';
import { ContractModification } from 'koffing/backend/model/claim/contract-modification.class';

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
                console.log(this.claims instanceof Claim);
                _.forEach(claims, (claim) => {
                    _.forEach(claim.changeset, (changeset: PartyModification) => {
                        this.changeSets.push(changeset);
                        // console.log(changeset);

                        // console.log(changeset instanceof ShopModification);
                        if (changeset instanceof ShopModification) {
                            console.log(changeset.shopModificationType);
                        }
                        if (changeset instanceof ContractModification) {
                            console.log(changeset.contractModificationType);
                        }
                    });
                });
                // console.log(this.changeSets);

                this.isShowClaimPanel = true;
            }
        });
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

import { Component, OnInit } from '@angular/core';

import { Claim } from 'koffing//backend/model/claim/claim.class';
import { ClaimService } from 'koffing/backend/services/claim.service';

@Component({
    selector: 'kof-claims',
    templateUrl: 'claims.component.pug'
})
export class ClaimsComponent implements OnInit {

    public claims: Claim[];
    public claim: Claim;
    public revokeReason: string;
    public isShowClaimPanel: boolean = false;

    constructor(
        private claimService: ClaimService,
    ) { }

    public ngOnInit() {
        this.getClaims();
    }

    public getClaims() {
        this.claimService.getClaims({status: 'pending'}).then((claims: Claim[]) => {
            if (claims.length > 0) {
                this.claims = claims;
                this.isShowClaimPanel = true;
            }
        });
    }

    public revoke(reasonControl: any) {
        if (!reasonControl.valid) {
            return;
        }
    }
}

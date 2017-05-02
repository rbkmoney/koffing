import { Component, OnInit } from '@angular/core';

import { Claim } from 'koffing//backend/backend.module';
import { ClaimService } from 'koffing/backend/backend.module';

@Component({
    selector: 'kof-claims',
    templateUrl: 'claims.component.pug'
})
export class ClaimsComponent implements OnInit {

    public claims: Claim[];
    public isShowClaimPanel: boolean = false;
    public isLoading: boolean = false;

    constructor(
        private claimService: ClaimService,
    ) { }

    public ngOnInit() {
        this.loadClaims();
    }

    public loadClaims() {
        this.isLoading = true;
        this.isShowClaimPanel = false;
        this.claimService.getClaims('pending').then((claims: Claim[]) => {
            if (claims.length > 0) {
                this.claims = claims;
                this.isShowClaimPanel = true;
            }
            this.isLoading = false;
        });
    }
}

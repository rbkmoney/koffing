import { Component, OnInit } from '@angular/core';

import { Claim } from 'koffing//backend/model/claim/claim.class';
import { HttpClaimService } from 'koffing/backend/services/http-claim.service';

@Component({
    selector: 'kof-claims',
    templateUrl: 'claims.component.pug'
})
export class ClaimsComponent implements OnInit {

    public claims: Claim[];
    public isShowClaimPanel: boolean = false;

    constructor(
        private httpClaimService: HttpClaimService,
    ) { }

    public ngOnInit() {
        this.httpClaimService.getClaims('pending').then((claims: Claim[]) => {
            if (claims.length > 0) {
                this.claims = claims;
                this.isShowClaimPanel = true;
            }
        });
    }
}

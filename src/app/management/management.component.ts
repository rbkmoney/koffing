import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClaimService } from 'koffing/backend/claim.service';
import { Claim } from 'koffing/backend';

@Component({
    templateUrl: 'management.component.pug'
})
export class ManagementComponent implements OnInit {

    public claims: Claim[];

    constructor(private claimService: ClaimService, private router: Router) { }

    public ngOnInit() {
        this.claimService.getClaims('pending').subscribe((claims: Claim[]) => {
            this.claims = claims;
        });
    }

    public createShop() {
        this.router.navigate(['/management/shop/create']);
    }

    public goToClaimDetails(claimID: number) {
        this.router.navigate(['/management/claim/', claimID]);
    }
}

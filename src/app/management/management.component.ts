import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClaimService } from 'koffing/backend/claim.service';
import { ShopService } from 'koffing/backend/shop.service';
import { Claim, Shop } from 'koffing/backend';

@Component({
    templateUrl: 'management.component.pug'
})
export class ManagementComponent implements OnInit {

    public claims: Claim[];

    public shops: Shop[];

    constructor(private claimService: ClaimService,
                private router: Router,
                private shopService: ShopService) {
    }

    public ngOnInit() {
        this.claimService.getClaims('pending').subscribe((claims: Claim[]) => {
            this.claims = claims;
        });
        this.shopService.getShops().subscribe((shops: Shop[]) => {
            this.shops = shops;
        });
    }

    public createShop() {
        this.router.navigate(['/management/shop/create']);
    }

    public goToClaimDetails(claimID: number) {
        this.router.navigate(['/management/claim', claimID]);
    }

    public goToShop(shopID: string) {
        this.router.navigate([`/analytics/${shopID}/invoices`]);
    }
}

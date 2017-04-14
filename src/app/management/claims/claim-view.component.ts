import { Component, Input } from '@angular/core';

import { ClaimService } from './claim.service';
import { HttpClaimService } from 'koffing/backend/backend.module';
import { Claim } from 'koffing/backend/backend.module';
import { Shop } from 'koffing/backend/backend.module';
import { Contract } from 'koffing/backend/backend.module';
import { PayoutToolBankAccount } from 'koffing/backend/backend.module';

@Component({
    selector: 'kof-claim-view',
    templateUrl: 'claim-view.component.pug'
})
export class ClaimViewComponent {

    @Input()
    public claim: Claim;

    public showPanel: boolean = false;
    public revokeReason: string = '';
    
    constructor(
        private claimService: ClaimService,
        private httpClaimService: HttpClaimService
    ) { }

    public show() {
        this.showPanel = !this.showPanel;
    }

    public revokeClaim(reason: string) {
        this.httpClaimService.revokeClaim(this.claim.id, reason).then(() => {
            console.log(`Claim revoke success`);
        });
    }
    
    public test() {
        this.claimService.createShop(new PayoutToolBankAccount(), new Contract(), new Shop()).then((claim) => {
            console.log(claim);
        });
    }
}

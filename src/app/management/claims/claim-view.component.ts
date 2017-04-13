import { Component, Input } from '@angular/core';

import { ClaimService } from './claim.service';
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
        private claimService: ClaimService
    ) { }

    public show() {
        this.showPanel = !this.showPanel;
    }

    public revokeClaim(reason: string) {
        console.log(`revokeClaim: ${reason}`);
    }
    
    public test() {
        this.claimService.createShop(new Shop(), new Contract(), new PayoutToolBankAccount()).then((claim) => {
            console.log(claim);
        });
    }
}

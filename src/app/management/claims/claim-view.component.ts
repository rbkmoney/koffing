import { Component, Input } from '@angular/core';

import { HttpClaimService } from 'koffing/backend/backend.module';
import { Claim } from 'koffing/backend/backend.module';

@Component({
    selector: 'kof-claim-view',
    templateUrl: 'claim-view.component.pug'
})
export class ClaimViewComponent {

    @Input()
    public claim: Claim;

    public showPanel: boolean = false;
    public isDeleted: boolean = false;
    public revokeReason: string = '';

    constructor(
        private httpClaimService: HttpClaimService
    ) { }

    public show() {
        this.showPanel = !this.showPanel;
    }

    public revokeClaim(reason: string) {
        this.httpClaimService.revokeClaim(this.claim.id, reason).then(() => {
            this.isDeleted = true;
        });
    }
}

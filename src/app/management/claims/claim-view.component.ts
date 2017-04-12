import { Component, Input } from '@angular/core';

import { Claim } from 'koffing//backend/model/claim/claim.class';

@Component({
    selector: 'kof-claim-view',
    templateUrl: 'claim-view.component.pug'
})
export class ClaimViewComponent {

    @Input()
    public claim: Claim;

    public showPanel: boolean = false;

    public show() {
        this.showPanel = !this.showPanel;
    }
}

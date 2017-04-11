import { Component, Input, OnInit } from '@angular/core';

import { Claim } from 'koffing/backend/classes/claim.class';

@Component({
    selector: 'kof-claim-view',
    templateUrl: 'claim-view.component.pug'
})
export class ClaimViewComponent implements OnInit {

    @Input()
    public claim: Claim;

    public showPanel: boolean = false;

    public ngOnInit() {
        console.log(this.claim);
    }

    public show() {
        this.showPanel = !this.showPanel;
    }
}

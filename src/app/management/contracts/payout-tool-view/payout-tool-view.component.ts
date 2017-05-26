import { Component, Input } from '@angular/core';

import { PayoutTool } from 'koffing/backend/model/contract/payout-tool.class';

@Component({
    selector: 'kof-payout-tool-view',
    templateUrl: 'payout-tool-view.component.pug'
})
export class PayoutToolViewComponent {

    @Input()
    public payoutTool: PayoutTool;
}

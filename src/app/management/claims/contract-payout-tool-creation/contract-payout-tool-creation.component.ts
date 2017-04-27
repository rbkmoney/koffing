import { Component, Input } from '@angular/core';

import { ContractPayoutToolCreation } from 'koffing/backend/backend.module';

@Component({
    selector: 'kof-contract-payout-tool-creation',
    templateUrl: 'contract-payout-tool-creation.component.pug'
})
export class ContractPayoutToolCreationComponent {

    @Input()
    public changeSet: ContractPayoutToolCreation;

    public showPanel: boolean = false;

    public show() {
        this.showPanel = !this.showPanel;
    }
}

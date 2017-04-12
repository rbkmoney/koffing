import { Component, Input } from '@angular/core';

@Component({
    selector: 'kof-contract-payout-tool-creation',
    templateUrl: 'contract-payout-tool-creation.component.pug'
})
export class ContractPayoutToolCreationComponent {

    @Input()
    public changeSet: any;

    public showPanel: boolean = false;

    public show() {
        this.showPanel = !this.showPanel;
    }
}

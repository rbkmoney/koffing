import { Component, Input } from '@angular/core';

import { ContractTermination } from 'koffing/backend/model/claim/contract-modification/contract-termination.class';

@Component({
    selector: 'kof-contract-termination',
    templateUrl: 'contract-termination.component.pug'
})
export class ContractTerminationComponent {

    @Input()
    public changeSet: ContractTermination;

    public showPanel: boolean = false;

    public show() {
        this.showPanel = !this.showPanel;
    }
}

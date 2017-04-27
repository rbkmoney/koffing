import { Component, Input } from '@angular/core';

import { ContractTermination } from 'koffing/backend/backend.module';

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

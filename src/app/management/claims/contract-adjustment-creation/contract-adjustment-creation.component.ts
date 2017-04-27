import { Component, Input } from '@angular/core';

import { ContractAdjustmentCreation } from 'koffing/backend/backend.module';

@Component({
    selector: 'kof-contract-adjustment-creation',
    templateUrl: 'contract-adjustment-creation.component.pug'
})
export class ContractAdjustmentCreationComponent {

    @Input()
    public changeSet: ContractAdjustmentCreation;

    public showPanel: boolean = false;

    public show() {
        this.showPanel = !this.showPanel;
    }
}

import { Component, Input } from '@angular/core';

import { ContractCreation } from 'koffing/backend/model/claim/contract-modification/contract-creation.class';

@Component({
    selector: 'kof-contract-creation',
    templateUrl: 'contract-creation.component.pug'
})
export class ContractCreationComponent {

    @Input()
    public changeSet: ContractCreation;

    public showPanel: boolean = false;

    public show() {
        this.showPanel = !this.showPanel;
    }
}

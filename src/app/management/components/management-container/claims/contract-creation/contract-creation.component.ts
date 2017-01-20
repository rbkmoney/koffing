import { Component, Input } from '@angular/core';

import { Contract } from 'koffing/backend/classes/contract.class';

@Component({
    selector: 'kof-contract-creation',
    templateUrl: 'contract-creation.component.pug'
})
export class ContractCreationComponent {

    @Input()
    public contract: Contract;

    public showPanel: boolean = false;

    public show() {
        this.showPanel = !this.showPanel;
    }
}

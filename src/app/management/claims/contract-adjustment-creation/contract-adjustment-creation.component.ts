import { Component, Input } from '@angular/core';

@Component({
    selector: 'kof-contract-adjustment-creation',
    templateUrl: 'contract-adjustment-creation.component.pug'
})
export class ContractAdjustmentCreationComponent {

    @Input()
    public changeSet: any;

    public showPanel: boolean = false;

    public show() {
        this.showPanel = !this.showPanel;
    }
}

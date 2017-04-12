import { Component, Input } from '@angular/core';

@Component({
    selector: 'kof-contract-termination',
    templateUrl: 'contract-termination.component.pug'
})
export class ContractTerminationComponent {

    @Input()
    public changeSet: any;

    public showPanel: boolean = false;

    public show() {
        this.showPanel = !this.showPanel;
    }
}

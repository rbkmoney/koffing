import { Component, Input } from '@angular/core';

@Component({
    selector: 'kof-contract-creation',
    templateUrl: 'contract-creation.component.pug'
})
export class ContractCreationComponent {

    @Input()
    public changeSet: any;

    public showPanel: boolean = false;

    public show() {
        this.showPanel = !this.showPanel;
    }
}

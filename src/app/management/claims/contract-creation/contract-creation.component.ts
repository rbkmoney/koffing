import { Component, Input } from '@angular/core';

@Component({
    selector: 'kof-contract-creation',
    templateUrl: 'contract-creation.component.pug',
    styleUrls: [`:host { cursor: pointer; }`]
})
export class ContractCreationComponent {

    @Input()
    public changeSet: any;

    public showPanel: boolean = false;

    public show() {
        this.showPanel = !this.showPanel;
    }
}

import { Component, Input } from '@angular/core';

@Component({
    selector: 'kof-payout-tool-creation',
    templateUrl: 'payout-tool-creation.component.pug',
    styleUrls: [`:host { cursor: pointer; }`]
})
export class PayoutToolCreationComponent {

    @Input()
    public changeSet: any;

    public showPanel: boolean = false;

    public show() {
        this.showPanel = !this.showPanel;
    }
}

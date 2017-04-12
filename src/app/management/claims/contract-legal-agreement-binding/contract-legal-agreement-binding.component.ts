import { Component, Input } from '@angular/core';

@Component({
    selector: 'kof-contract-legal-agreement-binding',
    templateUrl: 'contract-legal-agreement-binding.component.pug'
})
export class ContractLegalAgreementBindingComponent {

    @Input()
    public changeSet: any;

    public showPanel: boolean = false;

    public show() {
        this.showPanel = !this.showPanel;
    }
}

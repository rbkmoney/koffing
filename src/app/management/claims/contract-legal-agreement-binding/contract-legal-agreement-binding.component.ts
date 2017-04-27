import { Component, Input } from '@angular/core';

import { ContractLegalAgreementBinding } from 'koffing/backend/backend.module';

@Component({
    selector: 'kof-contract-legal-agreement-binding',
    templateUrl: 'contract-legal-agreement-binding.component.pug'
})
export class ContractLegalAgreementBindingComponent {

    @Input()
    public changeSet: ContractLegalAgreementBinding;

    public showPanel: boolean = false;

    public show() {
        this.showPanel = !this.showPanel;
    }
}

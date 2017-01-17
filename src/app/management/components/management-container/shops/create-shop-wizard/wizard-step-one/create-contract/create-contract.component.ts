import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { BankAccount } from 'koffing/backend/backend.module';
import { RussianLegalEntity } from 'koffing/backend/backend.module';
import { Contract } from 'koffing/backend/backend.module';
import { Contractor } from 'koffing/backend/backend.module';
import { WizardArgs } from 'koffing/management/management.module';

@Component({
    selector: 'kof-create-contract',
    templateUrl: 'create-contract.component.pug'
})
export class CreateContractComponent implements OnInit {

    @Input()
    public newContract: Contract;

    @Output()
    public readyStateChange = new EventEmitter();

    private isOnceValid: boolean;

    public ngOnInit() {
        this.isOnceValid = false;
    }

    public checkForm(form: any) {
        let emit = () => {
            this.readyStateChange.emit({
                contract: this.newContract,
                valid: form.valid
            });
        };

        if (form.valid) {
            emit();
            this.isOnceValid = true;
        } else if (!form.valid && this.isOnceValid) {
            emit();
            this.isOnceValid = false;
        }
    }

    public hasError(field: any): boolean {
        return field.dirty && field.invalid;
    }
}

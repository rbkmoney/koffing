import { Component, Input, Output, EventEmitter } from '@angular/core';

import { PayoutTool } from 'koffing/backend/classes/payout-tool.class';

@Component({
    selector: 'kof-create-paytool',
    templateUrl: 'create-paytool.component.pug'
})
export class CreatePayoutToolComponent {

    @Input()
    public newPayoutTool: PayoutTool;

    @Output()
    public readyStateChange = new EventEmitter();

    private isOnceValid: boolean = false;

    public checkForm(form: any) {
        let emit = () => {
            this.readyStateChange.emit({
                payoutTool: this.newPayoutTool,
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

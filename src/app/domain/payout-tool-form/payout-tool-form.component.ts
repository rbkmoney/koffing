import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
    selector: 'kof-payout-tool-form-2',
    templateUrl: 'payout-tool-form.component.pug'
})
export class PayoutToolFormComponent implements OnInit {

    @Input()
    public form: FormGroup;
    
    public bankAccountForm: AbstractControl;

    public ngOnInit() {
        this.bankAccountForm = this.form.get('bankAccount');
    }
}

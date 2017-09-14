import { FormBuilder, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { BankAccountFormService2 } from '../bank-account-form/bank-account-form.service';

@Injectable()
export class PayoutToolFormService2 {
    // todo переименовать после удаления старого PayoutToolFormService
    public form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private bankAccountFormService: BankAccountFormService2
    ) { }

    public initForm(): FormGroup {
        return this.fb.group({
            bankAccount: this.bankAccountFormService.initForm()
        });
    }
}

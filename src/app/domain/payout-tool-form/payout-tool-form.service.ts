import { FormBuilder, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { BankAccountFormService } from '../bank-account-form/bank-account-form.service';

@Injectable()
export class PayoutToolFormService {

    public form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private bankAccountFormService: BankAccountFormService
    ) { }

    public initForm(): FormGroup {
        return this.fb.group({
            bankAccount: this.bankAccountFormService.initForm()
        });
    }
}

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class BankAccountFormService {

    public form: FormGroup;

    constructor(private fb: FormBuilder) { }

    public initForm(type?: string): FormGroup {
        if (type) {
            switch (type) {
                case 'resident':
                    return this.createRussianBankForm();
                case 'nonresident':
            }       return this.createInternationalBankForm();
        } else {
            return this.createRussianBankForm();
        }
    }

    private createRussianBankForm() {
        return this.fb.group({
            account: ['', [
                Validators.required,
                Validators.pattern(/^\d{20}$/)
            ]],
            bankName: ['', [
                Validators.required,
                Validators.maxLength(100)
            ]],
            bankPostAccount: ['', [
                Validators.required,
                Validators.pattern(/^\d{20}$/)
            ]],
            bankBik: ['', [
                Validators.required,
                Validators.pattern(/^\d{9}$/)
            ]]
        });
    }

    private createInternationalBankForm() {
        return this.fb.group({
            accountHolder: ['', [
                Validators.required,
                Validators.maxLength(100)
            ]],
            bankName: ['', [
                Validators.required,
                Validators.maxLength(100)
            ]],
            bankAddress: ['', [
                Validators.required,
                Validators.maxLength(150)
            ]],
            iban: ['', [
                Validators.required,
                Validators.pattern(/^[A-Z0-9]{3,34}$/)
            ]],
            bic: ['', [
                Validators.required,
                Validators.pattern(/^([A-Z0-9]{8}|[A-Z0-9]{11})$/)
            ]]
        });
    }
}

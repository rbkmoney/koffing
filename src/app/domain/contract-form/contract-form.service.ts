import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { BankAccountFormService2 } from '../bank-account-form/bank-account-form.service';

@Injectable()
export class ContractFormService2 {
    // todo переименовать после удаления старого ContractFormService
    public form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private bankAccountFormService: BankAccountFormService2
    ) { }

    public initForm(): FormGroup {
        return this.fb.group({
            registeredName: ['', [
                Validators.required,
                Validators.maxLength(100)
            ]],
            registeredNumber: ['', [
                Validators.required,
                Validators.pattern(/^(\d{13}|\d{15})$/)
            ]],
            inn: ['', [
                Validators.required,
                Validators.pattern(/^(\d{10}|\d{12})$/)
            ]],
            postAddress: ['', [
                Validators.required,
                Validators.maxLength(1000)
            ]],
            actualAddress: ['', [
                Validators.required,
                Validators.maxLength(1000)
            ]],
            representativePosition: ['', [
                Validators.required,
                Validators.maxLength(100)
            ]],
            representativeFullName: ['', [
                Validators.required,
                Validators.maxLength(100)
            ]],
            representativeDocument: ['', [
                Validators.required,
                Validators.maxLength(1000)
            ]],
            bankAccount: this.bankAccountFormService.initForm()
        });
    }
}

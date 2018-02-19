import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import * as uuid from 'uuid/v4';

import { ContractCreation, RussianLegalEntity } from 'koffing/backend';
import { BankAccountFormService } from '../bank-account-form/bank-account-form.service';
import { ActivatedRoute } from '@angular/router';
import { InternationalLegalEntity } from 'koffing/backend/model/contract/contractor/international-legal-entity';

@Injectable()
export class ContractFormService {

    public form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private bankAccountFormService: BankAccountFormService,
        private route: ActivatedRoute
    ) { }

    public initForm(type?: string): FormGroup {
        if (type) {
            switch (type) {
                case 'resident':
                    return this.createRussianLegalEntityForm(type);
                case 'nonresident':
                    return this.createInternationalLegalEntityForm(type);
            }
        } else {
            return this.createRussianLegalEntityForm(type);
        }
    }

    public toContractCreation(contractForm: FormGroup): ContractCreation {
        return this.route.params.switchMap((params) => {
            switch (params.type) {
                case 'resident':
                    return new RussianLegalEntity(contractForm.value);
                case 'nonresident':
                    return new InternationalLegalEntity(contractForm.value);
            }
        });

        // let contractor;
        // this.route.params.subscribe((params) => {
        //     switch (params.type) {
        //         case 'resident':
        //             contractor = new RussianLegalEntity(contractForm.value);
        //         case 'nonresident':
        //             contractor = new InternationalLegalEntity(contractForm.value);
        //     }
        // });
        // return new ContractCreation(uuid(), contractor);
    }

    private createInternationalLegalEntityForm(type: string): FormGroup {
        return this.fb.group({
            legalName: ['', [
                Validators.required
            ]],
            registeredOffice: ['', [
                Validators.required,
            ]],
            tradingName: [''],
            principalPlaceOfBusiness: [''],
            bankAccount: this.bankAccountFormService.initForm(type)
        });
    }

    private createRussianLegalEntityForm(type: string): FormGroup {
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
            bankAccount: this.bankAccountFormService.initForm(type)
        });
    }
}

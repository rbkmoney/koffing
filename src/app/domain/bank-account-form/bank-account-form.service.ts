import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { RussianBankAccountFormService } from 'koffing/domain/bank-account-form/russian-bank-account-form/russian-bank-account-form.service';
import { InternationalBankAccountFormService } from 'koffing/domain/bank-account-form/international-bank-account-form/international-bank-account-form.service';

@Injectable()
export class BankAccountFormService {

    constructor(private russianBankAccountFormService: RussianBankAccountFormService,
                private internationalBankAccountFormService: InternationalBankAccountFormService) {
    }

    public initForm(type?: string): FormGroup {
        if (type) {
            switch (type) {
                case 'resident':
                    return this.russianBankAccountFormService.initForm();
                case 'nonresident':
                    return this.internationalBankAccountFormService.initForm();
            }
        }
    }
}

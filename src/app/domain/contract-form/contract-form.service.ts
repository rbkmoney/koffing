import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import * as uuid from 'uuid/v4';

import { ContractCreation, RussianLegalEntity, InternationalLegalEntity } from 'koffing/backend';
import { BankAccountFormService } from 'koffing/domain';
import { InternationalContractFormService } from './international-contract-form/international-contract-form.service';
import { RussianContractFormService } from './russian-contract-form/russian-contract-form.service';

@Injectable()
export class ContractFormService {

    constructor(private bankAccountFormService: BankAccountFormService,
                private internationalContractFormService: InternationalContractFormService,
                private russianContractFormService: RussianContractFormService) {
    }

    public initForm(type: string): FormGroup {
        switch (type) {
            case 'resident':
                return this.russianContractFormService.initForm(type);
            case 'nonresident':
                return this.internationalContractFormService.initForm(type);
        }
    }

    public toContractCreation(contractForm: FormGroup, type: string, paymentInstitutionID: number): ContractCreation {
        let contractor;
        switch (type) {
            case 'resident':
                contractor = new RussianLegalEntity(contractForm.value);
                break;
            case 'nonresident':
                contractor = new InternationalLegalEntity(contractForm.value);
                break;
        }
        return new ContractCreation(uuid(), contractor, paymentInstitutionID);
    }
}

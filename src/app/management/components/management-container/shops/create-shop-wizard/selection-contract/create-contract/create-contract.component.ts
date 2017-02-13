import { Component, Output, EventEmitter, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Contractor } from 'koffing/backend/classes/contractor.class';
import { BankAccount } from 'koffing/backend/classes/bank-account.class';
import { RussianLegalEntity } from 'koffing/backend/classes/russian-legal-entity.class';
import { ContractorTransfer } from 'koffing/management/components/management-container/shops/create-shop-wizard/selection-contract/create-contract/contractor-transfer.class';
import { SuggestionsService } from 'koffing/suggestions/services/suggestions.service';

@Component({
    selector: 'kof-create-contract',
    templateUrl: 'create-contract.component.pug'
})
export class CreateContractComponent implements OnInit, AfterViewInit {

    @Output()
    public onChange = new EventEmitter();

    public contractor: Contractor;

    @ViewChild('createContractForm')
    private form: NgForm;

    constructor(
        private suggestionsService: SuggestionsService
    ) { }

    public ngOnInit() {
        this.contractor = this.createInstance();
    }

    public ngAfterViewInit() {
        this.initBankSuggestions();
        this.initContractorSuggestions();
    }

    public checkForm() {
        this.onChange.emit(new ContractorTransfer(this.contractor, this.form.valid));
    }

    public hasError(field: any): boolean {
        return field.dirty && field.invalid;
    }

    private createInstance() {
        const bankAccountArgs = new BankAccount();
        const entityArgs = new RussianLegalEntity();
        const instance = new Contractor();
        instance.bankAccount = bankAccountArgs;
        instance.legalEntity = entityArgs;
        return instance;
    }

    private handleBankSuggestion(suggestion: BankSuggestion) {
        const ctrls = this.form.controls;

        let bankName = '';
        let bankPostAccount = '';
        let bankBik = '';

        if (suggestion) {
            bankName = suggestion.unrestricted_value;
            if (suggestion.data) {
                bankPostAccount = suggestion.data.correspondent_account;
                bankBik = suggestion.data.bic;
            }
        }

        ctrls['bankName'].setValue(bankName);
        ctrls['bankPostAccount'].setValue(bankPostAccount);
        ctrls['bankBik'].setValue(bankBik);

        this.checkForm();
    }

    private handleContractorSuggestion(suggestion: OgranizationSuggestion) {
        const ctrls = this.form.controls;

        let entityRegisteredName = '';
        let entityRegisteredNumber = '';
        let entityInn = '';
        let entityPostAddress = '';
        let entityRepresentativePosition = '';
        let entityRepresentativeFullname = '';

        if (suggestion) {
            entityRegisteredName = suggestion.unrestricted_value;
            if (suggestion.data) {
                entityRegisteredNumber = suggestion.data.ogrn;
                entityInn = suggestion.data.inn;
                if (suggestion.data.address) {
                    entityPostAddress = suggestion.data.address.unrestricted_value;
                }
                if (suggestion.data.management) {
                    entityRepresentativePosition = suggestion.data.management.post;
                    entityRepresentativeFullname = suggestion.data.management.name;
                }
            }
        }

        ctrls['entityRegisteredName'].setValue(entityRegisteredName);
        ctrls['entityRegisteredNumber'].setValue(entityRegisteredNumber);
        ctrls['entityInn'].setValue(entityInn);
        ctrls['entityPostAddress'].setValue(entityPostAddress);
        ctrls['entityRepresentativePosition'].setValue(entityRepresentativePosition);
        ctrls['entityRepresentativeFullname'].setValue(entityRepresentativeFullname);

        this.checkForm();
    }

    private initBankSuggestions() {
        this.suggestionsService.initBankSuggestions(
            'input.contract-bank-suggestions',
            this.handleBankSuggestion.bind(this)
        );
    }

    private initContractorSuggestions() {
        this.suggestionsService.initContractorSuggestions(
            'input.contractor-suggestions',
            this.handleContractorSuggestion.bind(this)
        );
    }
}

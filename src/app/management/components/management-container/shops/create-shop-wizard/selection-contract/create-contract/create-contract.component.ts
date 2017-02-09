import { Component, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Contractor } from 'koffing/backend/classes/contractor.class';
import { BankAccount } from 'koffing/backend/classes/bank-account.class';
import { RussianLegalEntity } from 'koffing/backend/classes/russian-legal-entity.class';
import { SuggestionSettings } from 'koffing/management/classes/suggestion-settings.const';

@Component({
    selector: 'kof-create-contract',
    templateUrl: 'create-contract.component.pug'
})
export class CreateContractComponent implements OnInit {

    @Output()
    public onContractorReady = new EventEmitter();

    public contractor: Contractor;

    @ViewChild('form')
    private form: NgForm;

    public ngOnInit() {
        this.contractor = this.createInstance();
        this.initBankSuggestions();
        this.initContractorSuggestions();
    }

    public checkForm() {
        if (this.form.valid) {
            this.onContractorReady.emit(this.contractor);
        }
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
        const bankNameControl = this.form.controls['bankName'];
        const bankPostAccountControl = this.form.controls['bankPostAccount'];
        const bankBikControl = this.form.controls['bankBik'];

        if (suggestion) {
            bankNameControl.setValue(suggestion.unrestricted_value);
            if (suggestion.data) {
                bankPostAccountControl.setValue(suggestion.data.correspondent_account);
                bankBikControl.setValue(suggestion.data.bic);
            }
        } else {
            bankNameControl.setValue('');
            bankPostAccountControl.setValue('');
            bankBikControl.setValue('');
        }

        this.checkForm();
    }

    private handleContractorSuggestion(suggestion: OgranizationSuggestion) {
        const entityRegisteredNameControl = this.form.controls['entityRegisteredName'];
        const entityRegisteredNumberControl = this.form.controls['entityRegisteredNumber'];
        const entityInnControl = this.form.controls['entityInn'];
        const entityPostAddressControl = this.form.controls['entityPostAddress'];
        const entityRepresentativePositionControl = this.form.controls['entityRepresentativePosition'];
        const entityRepresentativeFullnameControl = this.form.controls['entityRepresentativeFullname'];

        if (suggestion) {
            entityRegisteredNameControl.setValue(suggestion.unrestricted_value);
            if (suggestion.data) {
                entityRegisteredNumberControl.setValue(suggestion.data.ogrn);
                entityInnControl.setValue(suggestion.data.inn);
                if (suggestion.data.address) {
                    entityPostAddressControl.setValue(suggestion.data.address.unrestricted_value);
                }
                if (suggestion.data.management) {
                    entityRepresentativePositionControl.setValue(suggestion.data.management.post);
                    entityRepresentativeFullnameControl.setValue(suggestion.data.management.name);
                }
            }
        } else {
            entityRegisteredNameControl.setValue('');
            entityRegisteredNumberControl.setValue('');
            entityInnControl.setValue('');
            entityPostAddressControl.setValue('');
            entityRepresentativePositionControl.setValue('');
            entityRepresentativeFullnameControl.setValue('');
        }

        this.checkForm();
    }

    private initBankSuggestions() {
        (<JQuerySuggestions> $('input.bank-suggestions')).suggestions(<SuggestionsParams> {
            serviceUrl: SuggestionSettings.serviceUrl,
            token: SuggestionSettings.token,
            type: SuggestionSettings.bankType,
            count: 5,
            onSelect: this.handleBankSuggestion.bind(this)
        });
    }

    private initContractorSuggestions() {
        (<JQuerySuggestions> $('input.contractor-suggestions')).suggestions(<SuggestionsParams> {
            serviceUrl: SuggestionSettings.serviceUrl,
            token: SuggestionSettings.token,
            type: SuggestionSettings.partyType,
            count: 5,
            onSelect: this.handleContractorSuggestion.bind(this)
        });
    }
}

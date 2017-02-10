import { Component, Output, EventEmitter, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PayoutToolBankAccount } from 'koffing/backend/classes/payout-tool-bank-account.class';
import { BankAccount } from 'koffing/backend/classes/bank-account.class';
import { SuggestionSettings } from 'koffing/common/classes/suggestion-settings.const';
import { SuggestionsService } from 'koffing/common/services/suggestions.service';

@Component({
    selector: 'kof-create-paytool',
    templateUrl: 'create-paytool.component.pug'
})
export class CreatePayoutToolComponent implements OnInit, AfterViewInit {

    @Output()
    public onPayoutToolReady = new EventEmitter();

    public payoutTool: PayoutToolBankAccount;

    @ViewChild('form')
    private form: NgForm;

    constructor(
        private suggestionsService: SuggestionsService
    ) { }    
    
    public ngOnInit() {
        this.payoutTool = this.getInstance();
    }

    public ngAfterViewInit() {
        this.initBankSuggestions();
    }

    public checkForm() {
        if (this.form.valid) {
            this.onPayoutToolReady.emit(this.payoutTool);
        }
    }

    public hasError(field: any): boolean {
        return field.dirty && field.invalid;
    }

    private getInstance() {
        const bankAccount = new BankAccount();
        const instance = new PayoutToolBankAccount();
        instance.bankAccount = bankAccount;
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

    private initBankSuggestions() {
        this.suggestionsService.initSuggestions(
            SuggestionSettings.bankType,
            'input.bank-suggestions',
            this.handleBankSuggestion.bind(this)
        );
    }    
    
}

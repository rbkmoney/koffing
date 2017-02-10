import { Component, Output, EventEmitter, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PayoutToolBankAccount } from 'koffing/backend/classes/payout-tool-bank-account.class';
import { BankAccount } from 'koffing/backend/classes/bank-account.class';
import { PaytoolTransfer } from 'koffing/management/components/management-container/shops/create-shop-wizard/selection-paytool/create-paytool/paytool-transfer.class';
import { SuggestionSettings } from 'koffing/common/classes/suggestion-settings.const';
import { SuggestionsService } from 'koffing/common/services/suggestions.service';

@Component({
    selector: 'kof-create-paytool',
    templateUrl: 'create-paytool.component.pug'
})
export class CreatePayoutToolComponent implements OnInit, AfterViewInit {

    @Output()
    public onChange = new EventEmitter();

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
        this.onChange.emit(new PaytoolTransfer(this.payoutTool, this.form.valid));
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

        bankNameControl.setValue(bankName);
        bankPostAccountControl.setValue(bankPostAccount);
        bankBikControl.setValue(bankBik);

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

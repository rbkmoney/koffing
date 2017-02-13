import { Component, Output, EventEmitter, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PayoutToolBankAccount } from 'koffing/backend/classes/payout-tool-bank-account.class';
import { BankAccount } from 'koffing/backend/classes/bank-account.class';
import { PaytoolTransfer } from 'koffing/management/components/management-container/shops/create-shop-wizard/selection-paytool/create-paytool/paytool-transfer.class';
import { SuggestionsService } from 'koffing/suggestions/services/suggestions.service';

@Component({
    selector: 'kof-create-paytool',
    templateUrl: 'create-paytool.component.pug'
})
export class CreatePayoutToolComponent implements OnInit, AfterViewInit {

    @Output()
    public onChange = new EventEmitter();

    public payoutTool: PayoutToolBankAccount;

    @ViewChild('CreatePaytoolForm')
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

    private initBankSuggestions() {
        this.suggestionsService.initBankSuggestions(
            'input.paytool-bank-suggestions',
            this.handleBankSuggestion.bind(this)
        );
    }

}

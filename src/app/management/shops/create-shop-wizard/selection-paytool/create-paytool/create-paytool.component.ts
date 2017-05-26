import { Component, Output, Input, EventEmitter, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';

import { PayoutToolBankAccount } from 'koffing/backend/model/contract/payout-tool-bank-account.class';
import { BankAccount } from 'koffing/backend/model/contract/bank-account.class';
import { PayoutToolTransfer } from './paytool-transfer.class';
import { SuggestionsService } from 'koffing/suggestions/services/suggestions.service';
import { SuggestionConverterService } from 'koffing/suggestions/services/suggestion-converter.service';
import { BankAccountComparator } from './payout-tool-comparator.service';

@Component({
    selector: 'kof-create-paytool',
    templateUrl: 'create-paytool.component.pug',
    styleUrls: [`.title-label { padding-top: 5px; }`]
})
export class CreatePayoutToolComponent implements OnInit, AfterViewInit {

    @Input()
    public contractBankAccount: BankAccount;

    @Output()
    public onChange = new EventEmitter();

    public payoutToolBankAccount: PayoutToolBankAccount;
    public sameBankAccountChecked: boolean;
    public errorsHighlighted: boolean = false;

    @ViewChild('createPaytoolForm')
    public form: NgForm;

    constructor(
        private suggestionsService: SuggestionsService
    ) { }

    public ngOnInit() {
        this.payoutToolBankAccount = new PayoutToolBankAccount();
        this.compareAccounts();
    }

    public ngAfterViewInit() {
        this.initBankSuggestions();
    }

    public emitData() {
        this.compareAccounts();
        const transfer = new PayoutToolTransfer(this.payoutToolBankAccount, this.form.valid);
        this.onChange.emit(transfer);
    }

    public highlightErrors() {
        this.errorsHighlighted = true;
    }

    public hasError(field: any): boolean {
        return (this.errorsHighlighted || field.dirty) && field.invalid;
    }

    public copyContractBankAccount() {
        if (this.sameBankAccountChecked) {
            this.setFormControls(this.contractBankAccount);
            this.emitData();
        }
    }

    public contractBankAccountReady(): boolean {
        return !_.isNil(this.contractBankAccount) && !_.isEmpty(this.contractBankAccount);
    }

    public compareAccounts() {
        if (this.payoutToolBankAccount && this.contractBankAccount) {
            this.sameBankAccountChecked = BankAccountComparator.isEqual(this.payoutToolBankAccount.bankAccount, this.contractBankAccount);
        }
    }

    private handleBankSuggestion(suggestion: BankSuggestion) {
        const suggestionAccount = SuggestionConverterService.toBankAccount(suggestion);
        this.setFormControls(suggestionAccount);
        this.emitData();
    }

    private setFormControls(object: BankAccount) {
        if (_.isNil(object)) {
            return;
        }
        _.forEach(object, (value, fieldName) => {
            const control = this.form.controls[fieldName];
            if (control) {
                control.setValue(value);
            }
        });
    }

    private initBankSuggestions() {
        const selector = '.paytool-bank-suggestions';
        this.suggestionsService.initBankSuggestions(selector, this.handleBankSuggestion.bind(this));
    }
}

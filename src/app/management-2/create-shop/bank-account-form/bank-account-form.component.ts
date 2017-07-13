import { AfterViewInit, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SuggestionsService } from 'koffing/suggestions/services/suggestions.service';

@Component({
    selector: 'kof-bank-account-form',
    templateUrl: 'bank-account-form.component.pug'
})
export class BankAccountFormComponent implements AfterViewInit {

    @Input()
    public form: FormGroup;

    constructor(private suggestionsService: SuggestionsService) { }

    public ngAfterViewInit() {
        this.initBankSuggestions();
    }

    private initBankSuggestions() {
        const selector = '.bank-suggestions'; // TODO need dynamic selector
        this.suggestionsService.initBankSuggestions(selector, this.handleBank.bind(this));
    }

    private handleBank(suggestion: BankSuggestion) {
        const value: any = {};
        if (suggestion) {
            value.bankName = suggestion.unrestricted_value;
            if (suggestion.data) {
                value.bankPostAccount = suggestion.data.correspondent_account;
                value.bankBik = suggestion.data.bic;
            }
        }
        this.form.patchValue(value);
    }
}

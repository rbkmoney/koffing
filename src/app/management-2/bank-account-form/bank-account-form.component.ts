import { AfterViewInit, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SuggestionsService } from 'koffing/suggestions/services/suggestions.service';
import { BankAccountFormService } from './bank-account-form.service';

@Component({
    selector: 'kof-bank-account-form',
    templateUrl: 'bank-account-form.component.pug',
    providers: [BankAccountFormService]
})
export class BankAccountFormComponent implements AfterViewInit {

    @Input()
    public form: FormGroup;

    constructor(private suggestionsService: SuggestionsService,
                private bankAccountFormService: BankAccountFormService) { }

    public ngAfterViewInit() {
        this.initBankSuggestions();
    }

    private initBankSuggestions() {
        const selector = '.bank-suggestions'; // TODO need dynamic selector
        this.suggestionsService.initBankSuggestions(selector, this.handleBank.bind(this));
    }

    private handleBank(suggestion: BankSuggestion) {
        const value = this.bankAccountFormService.toFormValue(suggestion);
        this.form.patchValue(value);
    }
}

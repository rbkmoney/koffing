import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { CreateShopService } from 'koffing/management-2/create-shop/create-shop.service';
import { SuggestionsService } from 'koffing/suggestions/services/suggestions.service';

@Component({
    selector: 'kof-contract-group',
    templateUrl: 'contract-group.component.pug'
})
export class ContractGroupComponent implements OnInit, AfterViewInit {

    public contractGroup: FormGroup;
    public accountGroup: AbstractControl;

    constructor(private createShopService: CreateShopService,
                private suggestionsService: SuggestionsService) {
    }

    public ngOnInit() {
        this.contractGroup = this.createShopService.contractGroup;
        this.accountGroup = this.contractGroup.get('bankAccount');
    }

    public ngAfterViewInit() {
        this.initContractorSuggestions();
    }

    private handleContractor(suggestion: OgranizationSuggestion) {
        const value: any = {};
        value.registeredName = suggestion.unrestricted_value;
        if (suggestion.data) {
            value.registeredNumber = suggestion.data.ogrn;
            value.inn = suggestion.data.inn;
            if (suggestion.data.address) {
                value.postAddress = suggestion.data.address.unrestricted_value;
            }
            if (suggestion.data.management) {
                value.representativePosition = suggestion.data.management.post;
                value.representativeFullName = suggestion.data.management.name;
            }
        }
        this.contractGroup.patchValue(value);
    }

    private initContractorSuggestions() {
        const selector = '.contractor-suggestions';
        this.suggestionsService.initContractorSuggestions(selector, this.handleContractor.bind(this));
    }
}

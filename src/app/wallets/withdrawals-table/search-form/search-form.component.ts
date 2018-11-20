import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map } from 'lodash';

import { SelectItem } from 'koffing/common/select/select-item';
import { SearchFormService } from './search-form.service';
import { WITHDRAWAL_STATUS_LABEL } from '../../witchdrawal-status-label';

@Component({
    selector: 'kof-wallet-search-form',
    templateUrl: 'search-form.component.pug',
    providers: [SearchFormService],
    styleUrls: ['search-form.component.less']
})
export class SearchFormComponent implements OnInit {

    @Output()
    public onSearch: EventEmitter<void> = new EventEmitter<void>();

    public searchForm: FormGroup;
    public additionalParamsVisible: boolean;
    public witchdrawalStatuses: SelectItem[];

    constructor(private searchFormService: SearchFormService) {
    }

    public ngOnInit() {
        this.witchdrawalStatuses = map(WITHDRAWAL_STATUS_LABEL, (name, key) => new SelectItem(key, name));

        this.searchForm = this.searchFormService.searchForm;
        this.searchForm.valueChanges
            .filter((value) => this.searchForm.status === 'VALID')
            .debounceTime(300)
            .subscribe(() => this.onSearch.emit());
        this.additionalParamsVisible = this.searchFormService.hasFormAdditionalParams();
    }

    public reset() {
        this.searchFormService.reset();
        this.onSearch.emit();
    }

    public toggleAdditionalParamsVisible() {
        this.additionalParamsVisible = !this.additionalParamsVisible;
    }
}

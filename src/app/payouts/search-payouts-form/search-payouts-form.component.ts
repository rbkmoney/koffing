import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SearchPayoutsFormService } from './search-payouts-form.service';
import { SelectItem } from 'koffing/common/select/select-item';

@Component({
    selector: 'kof-search-payouts-form',
    templateUrl: 'search-payouts-form.component.pug',
    styleUrls: ['search-payouts-form.component.less']
})
export class SearchPayoutsFormComponent implements OnInit {

    @Output()
    public onReadyParams: EventEmitter<void> = new EventEmitter<void>();

    public payoutStatusSelectItems: SelectItem[] = [
        {label: 'Любой', value: ''},
        {label: 'Выплачен', value: 'paid'},
        {label: 'Не выплачен', value: 'unpaid'},
        {label: 'Подтвержден', value: 'confirmed'},
        {label: 'Отменен', value: 'cancelled'}
    ];

    public form: FormGroup;

    constructor(private searchPayoutsFormService: SearchPayoutsFormService) { }

    public ngOnInit() {
        this.form = this.searchPayoutsFormService.form;
        this.form.valueChanges
            .filter((value) => this.form.status === 'VALID')
            .debounceTime(100)
            .subscribe(() => this.onReadyParams.emit());
    }
}

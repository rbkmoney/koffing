import { Component, Input, Output, OnInit, EventEmitter, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import { map } from 'lodash';
import { invoiceStatuses } from '../invoice-statuses';

import { SelectItem } from 'koffing/common/common.module';
import { SearchParams } from './search-params';

@Component({
    selector: 'kof-search-form',
    templateUrl: 'search-form.component.pug',
    styleUrls: ['search-form.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class SearchFormComponent implements OnInit {

    @Input()
    public searchParams: SearchParams;

    @Output()
    public onSearch: EventEmitter<SearchParams> = new EventEmitter<SearchParams>();

    public statuses: SelectItem[];

    public isInvalidDate: boolean = false;

    public isLoading: boolean = true;

    public ngOnInit() {
        this.statuses = map(invoiceStatuses, (name, key) => new SelectItem(key, name));
    }

    public selectFromTime() {
        this.searchParams.fromTime = moment(this.searchParams.fromTime).hour(0).minute(0).second(0).toDate();
    }

    public selectToTime() {
        this.searchParams.toTime = moment(this.searchParams.toTime).hour(23).minute(59).second(59).toDate();
    }

    public search() {
        this.isInvalidDate = false;
        if (this.searchParams.fromTime > this.searchParams.toTime) {
            this.isInvalidDate = true;
            return;
        }
        this.onSearch.emit(this.searchParams);
    }
}

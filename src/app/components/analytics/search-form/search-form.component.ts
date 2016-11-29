import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';

import { PAYMENT_STATUSES } from '../payment-statuses.const';
import { SelectItem } from '../../../common/kof-select/kof-select.class';

@Component({
    selector: 'kof-search-form',
    templateUrl: 'search-form.component.pug'
})
export class SearchFormComponent implements OnInit {

    @Input()
    public searchParams: any;

    @Output()
    public onSearch: EventEmitter<any> = new EventEmitter<any>();

    private statuses: any;

    public ngOnInit() {
        this.statuses = _.map(PAYMENT_STATUSES.GET, (name: string, key: string) => new SelectItem(key, name));
    }

    public search() {
        this.onSearch.emit();
    }

    public onChangeStatus(status: string) {
        if (status) {
            this.searchParams.status = status;
        } else {
            delete this.searchParams.status;
        }
    }

    get searchFromTime() {
        return moment(this.searchParams.fromTime).format('YYYY-MM-DD');
    }

    set searchFromTime(value: any) {
        this.searchParams.fromTime = moment(value).format();
    }

    get searchToTime() {
        return moment(this.searchParams.toTime).format('YYYY-MM-DD');
    }

    set searchToTime(value: any) {
        this.searchParams.toTime = moment(value).format();
    }
}

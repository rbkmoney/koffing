import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';

import { PAYMENT_STATUSES } from '../search-result/payment-statuses.const';
import { SelectItem } from 'kof-modules/common/components/kof-select/kof-select.class';

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

    private fromTime: Date;

    private toTime: Date;

    get searchFromTime() {
        return this.fromTime;
    }

    set searchFromTime(value: Date) {
        this.searchParams.fromTime = moment(value).utc().format();
        this.fromTime = value;
    }

    get searchToTime() {
        return this.toTime;
    }

    set searchToTime(value: Date) {
        this.searchParams.toTime = moment(value).utc().format();
        this.toTime = value;
    }

    public ngOnInit() {
        this.statuses = _.map(PAYMENT_STATUSES.GET, (name: string, key: string) => new SelectItem(key, name));

        this.fromTime = new Date(this.searchParams.fromTime);
        this.toTime = new Date(this.searchParams.toTime);
    }

    public search() {
        this.onSearch.emit();
    }

    public onCheckStatus() {
        if (!this.searchParams.status) {
            delete this.searchParams.status;
        }
    }

}

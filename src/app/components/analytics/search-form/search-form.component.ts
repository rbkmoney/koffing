import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import * as _ from 'lodash';
import * as moment from "moment";

import {PAYMENT_STATUSES} from '../payment-statuses.const'

@Component({
    selector: 'search-form',
    templateUrl: 'search-form.component.pug'
})
export class SearchFormComponent implements OnInit {

    @Input() searchParams: any;
    @Output() onSearch: EventEmitter<any> = new EventEmitter<any>();
    private statuses: any;

    private fromTime: Date;
    private toTime: Date;

    ngOnInit() {
        this.statuses = _.map(PAYMENT_STATUSES.GET, (name, key) => {
            return {name, key}
        });

        this.fromTime = new Date(this.searchParams.fromTime);
        this.toTime = new Date(this.searchParams.toTime);
    }

    search() {
        this.onSearch.emit();
    }

    onChangeStatus(status: string) {
        if (!status) {
            delete this.searchParams.status;
        }
    }

    get searchFromTime() {
        return this.fromTime;
    }

    set searchFromTime(value: any) {
        this.searchParams.fromTime = moment(value).utc().format();
        this.fromTime = new Date(this.searchParams.fromTime);
    }

    get searchToTime() {
        return this.toTime;
    }

    set searchToTime(value: any) {
        this.searchParams.toTime = moment(value).utc().format();
    }

}

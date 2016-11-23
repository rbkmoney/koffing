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

    ngOnInit() {
        this.statuses = _.map(PAYMENT_STATUSES.GET, (name, key) => {
            return {name, key}
        });
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

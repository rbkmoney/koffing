import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import * as _ from 'lodash';
import * as moment from "moment";

import { PAYMENT_STATUSES } from '../payment-statuses.const';
import { SelectItem } from '../kof-select/kof-select.class';

@Component({
    selector: 'search-form',
    templateUrl: 'search-form.component.pug'
})
export class SearchFormComponent implements OnInit {

    @Input() searchParams: any;
    @Output() onSearch: EventEmitter<any> = new EventEmitter<any>();

    public statuses: SelectItem[] = [];

    ngOnInit() {
        this.statuses = _.map(PAYMENT_STATUSES.GET, (name: string, key: string) => new SelectItem(key, name));
    }

    search() {
        this.onSearch.emit();
    }

    onChangeStatus(status: string) {
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

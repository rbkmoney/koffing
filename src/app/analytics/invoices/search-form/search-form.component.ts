import { Component, Input, Output, OnInit, EventEmitter, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import { map } from 'lodash';
import { invoiceStatuses } from '../invoice-statuses';

import { SelectItem } from 'koffing/common/common.module';
import { FormSearchParams } from './form-search-params';

@Component({
    selector: 'kof-search-form',
    templateUrl: 'search-form.component.pug',
    styleUrls: ['search-form.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class SearchFormComponent implements OnInit {

    @Input()
    public searchParams: FormSearchParams;

    @Output()
    public onSearch: EventEmitter<FormSearchParams> = new EventEmitter<FormSearchParams>();

    public invoiceStatuses: SelectItem[];

    public paymentStatuses: SelectItem[];

    public isInvalidDate: boolean = false;

    public ngOnInit() {
        this.invoiceStatuses = map(invoiceStatuses, (name, key) => new SelectItem(key, name));
        this.paymentStatuses = map(invoiceStatuses, (name, key) => new SelectItem(key, name));
    }

    public selectInvoiceFrom() {
        this.searchParams.invoiceFrom = moment(this.searchParams.invoiceFrom)
            .hour(0).minute(0).second(0).toDate();
    }

    public selectInvoiceTo() {
        this.searchParams.invoiceTo = moment(this.searchParams.invoiceTo)
            .hour(23).minute(59).second(59).toDate();
    }

    public selectPaymentFrom() {
        this.searchParams.paymentFrom = moment(this.searchParams.paymentFrom)
            .hour(0).minute(0).second(0).toDate();
    }

    public selectPaymentTo() {
        this.searchParams.paymentTo = moment(this.searchParams.paymentTo)
            .hour(23).minute(59).second(59).toDate();
    }

    public search() {
        // this.isInvalidDate = false;
        // if (this.searchParams.fromTime > this.searchParams.toTime) {
        //     this.isInvalidDate = true;
        //     return;
        // }
        this.onSearch.emit(this.searchParams);
    }
}

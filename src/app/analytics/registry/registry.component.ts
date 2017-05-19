import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import * as Rx from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import { SearchService } from 'koffing/backend/search.service';
import { SearchPaymentsParams } from 'koffing/backend/requests/search-payments-request';
import { DateRange } from '../date-range-selector/date-range.class';

@Component({
    templateUrl: 'registry.component.pug'
})
export class RegistryComponent implements OnInit {

    public shopID: string;
    public fromTime: Date = moment().subtract(1, 'month').hour(0).minute(0).second(0).toDate();
    public toTime: Date = moment().hour(23).minute(59).second(59).toDate();

    constructor(
        private route: ActivatedRoute,
        private searchService: SearchService
    ) { }

    public ngOnInit() {
        this.route.parent.params.subscribe((params) => {
            this.shopID = params['shopID'];
        });
    }

    public excel(dateRange: DateRange) {
        const searchPaymentsParams = new SearchPaymentsParams();
        searchPaymentsParams.fromTime = dateRange.from;
        searchPaymentsParams.toTime = dateRange.to;
        searchPaymentsParams.limit = 5;
        searchPaymentsParams.offset = 0;

        this.searchService.searchPayments(this.shopID, searchPaymentsParams).subscribe((response) => {
            let payments = response.result;
            const countAdditionalPaymentsRequests = _.ceil((response.totalCount - searchPaymentsParams.limit) / searchPaymentsParams.limit);
            if (countAdditionalPaymentsRequests > 0) {
                const additionalPaymentsRequests = [];
                for (let i = 1; i <= countAdditionalPaymentsRequests; i++) {
                    searchPaymentsParams.offset = i * searchPaymentsParams.limit;
                    additionalPaymentsRequests.push(this.searchService.searchPayments(this.shopID, searchPaymentsParams));
                }
                Observable.forkJoin(additionalPaymentsRequests).subscribe((response) => {
                    _.forEach(response, (value) => {
                        payments = _.concat(payments, value.result);
                    });
                    console.log(payments);
                });
            } else {
                console.log(payments);
            }
        });

    }

}

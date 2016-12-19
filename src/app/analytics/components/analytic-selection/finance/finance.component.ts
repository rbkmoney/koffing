import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';

import { Invoice } from 'kof-modules/backend/backend.module';
import { InvoiceService } from 'kof-modules/backend/backend.module';
import { SlimBarService } from 'kof-modules/common/services/slim-bar.service';

@Component({
    templateUrl: 'finance.component.pug'
})
export class FinanceComponent implements OnInit {

    public invoices: Invoice[];
    public totalCount: number;
    public isLoading: boolean = false;
    public searchParams: any;
    public shopID: string;

    constructor(
        private route: ActivatedRoute,
        private invoiceService: InvoiceService,
        private slimBarService: SlimBarService
    ) { }

    public ngOnInit() {
        // todo: описать class SearchParams и создать как экземпляр класса
        this.searchParams = {
            fromTime: moment().subtract(1, 'M').utc().format(),
            toTime: moment().utc().format(),
            limit: 20,
            offset: 0,
            invoiceID: null
        };

        this.route.parent.params.subscribe((params: Params) => {
            this.shopID = params['shopID'];
            this.search();
        });
    }

    public search(offset?: number) {
        this.searchParams.offset = offset ? offset : 0;
        this.isLoading = true;

        this.slimBarService.start();

        this.invoiceService.getInvoices(this.shopID, this.searchParams).then(response => {
            this.isLoading = false;
            this.invoices = response.invoices;
            this.totalCount = response.totalCount;

            this.slimBarService.stop();
        }).catch((error) => {
            this.slimBarService.stop();
        });
    }

    public onChangePage(offset: number) {
        this.search(offset);
    }
}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import * as moment from "moment";

import {InvoiceService, Invoice} from '../../../services/invoice/invoice.service';

@Component({
    templateUrl: 'finance.component.pug',
    providers: [InvoiceService]
})
export class FinanceComponent implements OnInit {

    private invoices: Array<Invoice>;
    private totalCount: number;
    private isUploaded: boolean = false;
    private searchParams: any;

    constructor(private route: ActivatedRoute,
                private invoiceService: InvoiceService) {
    }

    ngOnInit() {
        this.route.parent.params.subscribe((params: Params) => {
            this.invoiceService.getInvoices(params['shopID']).then(response => {
                this.isUploaded = true;
                this.invoices = response.invoices;
                this.totalCount = response.totalCount;
                this.search();
            });
        });

        //todo описать class и создать searchParams как экземпляр класса
        this.searchParams = {
            fromTime: moment().subtract(1, 'M').format('YYYY-MM-DD'),
            toTime: moment().format('YYYY-MM-DD'),
            limit: 20,
            offset: 0
        };
    }

    search() {
        console.log('searching');
        console.log(this.searchParams.fromTime);
        console.log(this.searchParams.toTime);
    }
}

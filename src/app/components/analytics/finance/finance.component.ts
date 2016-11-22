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
    private shopID: string;

    constructor(private route: ActivatedRoute,
                private invoiceService: InvoiceService) {
    }

    ngOnInit() {
        //todo: описать class SearchParams и создать как экземпляр класса
        this.searchParams = {
            fromTime: moment().subtract(1, 'M').format(),
            toTime: moment().format(),
            limit: 20,
            offset: 0,
            invoiceID: null
        };
        this.route.parent.params.subscribe((params: Params) => {
            this.shopID = params['shopID'];
            this.search();
        });
    }

    search(offset?: number) {
        this.searchParams.offset = offset ? offset : 0;
        this.isUploaded = false;
        this.invoiceService.getInvoices(this.shopID, this.searchParams).then(response => {
            this.isUploaded = true;
            this.invoices = response.invoices;
            this.totalCount = response.totalCount;
        });
    }

    onChangePage(offset: number) {
        this.search(offset);
    }
}

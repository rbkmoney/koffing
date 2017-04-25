import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Invoice } from 'koffing/backend/model/invoice';
import { InvoiceTableItem } from './invoice-table-item';
import { SearchResultService } from './search-result.service';
import { SearchService } from 'koffing/backend/search.service';
import { Payment } from 'koffing/backend/model/payment';

@Component({
    selector: 'kof-search-result',
    templateUrl: 'search-result.component.pug'
})
export class SearchResultComponent implements OnInit {

    constructor(private searchService: SearchService) { }

    @Input()
    public invoices: Observable<Invoice[]>;

    public invoiceTableItems: Observable<InvoiceTableItem[]>;

    public payments: Observable<Payment[]>;

    public ngOnInit() {
        this.invoiceTableItems = this.invoices.map((invoices) => SearchResultService.toInvoiceTableItems(invoices));
        this.payments = this.searchService.searchPaymentsStub().map((searchResult) => searchResult.payments);
    }

    public togglePaymentPanel(item: InvoiceTableItem) {
        item.visible = !item.visible;
    }
}

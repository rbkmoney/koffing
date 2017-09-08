import { Component, Input, OnInit } from '@angular/core';

import { Invoice } from 'koffing/backend/model/invoice';
import { PaymentsService } from './payments.service';
import { SearchResult } from './search-result';

@Component({
    selector: 'kof-payment',
    templateUrl: 'payments.component.pug',
    providers: [PaymentsService]
})
export class PaymentsComponent implements OnInit {

    @Input()
    public invoice: Invoice;

    public searchResult: SearchResult;

    constructor(private paymentsService: PaymentsService) {
    }

    public ngOnInit() {
        this.search();
    }

    public search() {
        this.paymentsService.search(this.invoice.shopID, this.invoice.id).subscribe((result) => {
            this.searchResult = result;
        });
    }
}

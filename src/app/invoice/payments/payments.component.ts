import { Component, Input, OnChanges } from '@angular/core';

import { Invoice } from 'koffing/backend/model/invoice';
import { Payment } from 'koffing/backend/model/payment/payment';
import { PaymentsService } from './payments.service';
import { SearchResult } from './search-result';
import { INVOICE_STATUS, PAYMENT_STATUS } from 'koffing/backend';

@Component({
    selector: 'kof-payment',
    templateUrl: 'payments.component.pug',
    styleUrls: ['payments.component.less'],
    providers: [PaymentsService]
})
export class PaymentsComponent implements OnChanges {

    @Input()
    public invoice: Invoice;

    public searchResult: SearchResult;

    constructor(private paymentsService: PaymentsService) {
    }

    public ngOnChanges() {
        if (this.invoice) {
            this.search();
        }
    }

    public search() {
        this.paymentsService.search(this.invoice.shopID, this.invoice.id).subscribe((result) => {
            this.searchResult = result;
        });
    }

    public isHoldActionsAvailable(payment: Payment) {
        return payment.status === PAYMENT_STATUS.processed;
    }

    public changeStatus(status: string, payment: Payment) {
        payment.status = status;
        if (payment.status === PAYMENT_STATUS.captured) {
            this.invoice.status = INVOICE_STATUS.paid;
        }
    }
}

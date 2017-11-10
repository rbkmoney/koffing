import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { Invoice, Payment, InvoiceStatus, PaymentStatus } from 'koffing/backend';
import { PaymentsService } from './payments.service';
import { SearchResult } from './search-result';

@Component({
    selector: 'kof-payments',
    templateUrl: 'payments.component.pug',
    styleUrls: ['payments.component.less'],
    providers: [PaymentsService]
})
export class PaymentsComponent implements OnChanges {

    @Input()
    public invoice: Invoice;

    @Output()
    public onProcessedPayment: EventEmitter<boolean> = new EventEmitter();

    public searchResult: SearchResult;

    constructor(private paymentsService: PaymentsService) { }

    public ngOnChanges() {
        if (this.invoice) {
            this.search();
        }
    }

    public search() {
        this.paymentsService.search(this.invoice.shopID, this.invoice.id).subscribe((result) => {
            const processedPayment = result.payments.find((payment) => payment.status === PaymentStatus.processed);
            const pendingPayment = result.payments.find((payment) => payment.status === PaymentStatus.pending);
            this.onProcessedPayment.emit(!!processedPayment || !!pendingPayment);
            this.searchResult = result;
        });
    }

    public isHoldActionsAvailable(payment: Payment) {
        return payment.status === PaymentStatus.processed;
    }

    public isRefundActionAvailable(payment: Payment) {
        return payment.status === PaymentStatus.captured;
    }

    public changeStatus(status: string, payment: Payment) {
        payment.status = status;
        if (payment.status === PaymentStatus.captured) {
            this.invoice.status = InvoiceStatus.paid;
        }
        if (payment.status !== PaymentStatus.processed) {
            this.onProcessedPayment.emit(false);
        }
    }
}

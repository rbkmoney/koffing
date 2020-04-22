import { Component, Input, OnInit } from '@angular/core';
import { RefundTableItem } from './refund-table-item';
import { InvoiceService } from 'koffing/backend/invoice.service';
import { WebhookTableItem } from 'koffing/webhooks/webhook-table-item';
import { Invoice, Payment, PaymentRefund } from 'koffing/backend';

@Component({
    selector: 'kof-payment-refunds',
    templateUrl: 'payment-refunds.component.pug'
})
export class PaymentRefundsComponent implements OnInit {
    @Input()
    public invoice: Invoice;

    @Input()
    public payment: Payment;

    public refundTableItems: RefundTableItem[];

    private refunds: PaymentRefund[];

    constructor(private invoiceService: InvoiceService) {}

    public ngOnInit() {
        this.getRefunds();
    }

    public onRefund() {
        this.getRefunds();
    }

    public toggleRefundDetailsPanel(item: WebhookTableItem) {
        item.visible = !item.visible;
    }

    public isRefundActionAvailable(): boolean {
        let result: boolean = false;
        if (this.payment.status === 'captured') {
            if (this.refunds && this.refunds.length > 0) {
                const totalRefunded = this.refunds.reduce(
                    (acc, current) => (current.status === 'succeeded' ? acc + current.amount : acc),
                    0
                );
                result = totalRefunded < this.payment.amount;
            } else {
                result = true;
            }
        }
        return result;
    }

    private getRefunds() {
        this.invoiceService.getRefunds(this.invoice.id, this.payment.id).subscribe(refunds => {
            this.refunds = refunds;
            this.refundTableItems = refunds.map(refund => new RefundTableItem(refund));
        });
    }
}

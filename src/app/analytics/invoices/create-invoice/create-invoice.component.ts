import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';

import { Invoice } from 'koffing/backend/model/invoice';
import { InvoiceService } from 'koffing/backend/invoice.service';
import { InvoiceParamsAll } from 'koffing/backend/requests/invoice-params-all';
import { InvoiceFormService } from '../../invoice-form/invoice-form.service';
import { INVOICE_TYPES } from '../../invoice-form/invoice-types';
import { CreateInvoiceService } from './create-invoice.service';

@Component({
    selector: 'kof-create-invoice',
    templateUrl: 'create-invoice.component.pug',
    encapsulation: ViewEncapsulation.None
})
export class CreateInvoiceComponent implements OnInit {

    @Input()
    public shopID: string;

    @Output()
    public onCreate: EventEmitter<Invoice> = new EventEmitter();

    public invoice: Invoice;
    public invoiceForm: FormGroup;

    constructor(
        private invoiceService: InvoiceService,
        private invoiceFormService: InvoiceFormService
    ) { }

    public ngOnInit() {
        this.invoiceForm = this.invoiceFormService.form;
        this.setDefaultFormValues();
    }

    public createInvoice() {
        const params = CreateInvoiceService.toInvoiceParams(this.invoiceForm.value, this.shopID);
        this.invoiceService.createInvoice(params).subscribe((invoiceAndToken) => {
            this.setDefaultFormValues();
            this.onCreate.emit(invoiceAndToken.invoice);
        });
    }

    private setDefaultFormValues() {
        this.invoiceForm.patchValue({
            amount: 10,
            product: '',
            description: '',
            dueDate: moment().add(1, 'h').toDate(),
            selectedInvoiceType: INVOICE_TYPES.fixed,
            cart: []
        });
    }
}

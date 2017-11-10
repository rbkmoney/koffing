import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { map } from 'lodash';

import { SelectItem } from 'koffing/common/select/select-item';
import { InvoiceFormService } from './invoice-form.service';
import { InvoiceLineTaxVatRates } from 'koffing/backend';

@Component({
    selector: 'kof-invoice-form',
    templateUrl: './invoice-form.component.pug',
    styleUrls: ['./invoice-form.component.less']
})
export class InvoiceFormComponent implements OnInit {

    @Input()
    public form: FormGroup;

    public invoiceLineTaxItems: SelectItem[];
    public minDueDate: Date = moment().toDate();

    constructor(private invoiceFormService: InvoiceFormService) { }

    public ngOnInit() {
        this.invoiceLineTaxItems = map(InvoiceLineTaxVatRates, (value) => new SelectItem(value, value));
    }

    public addProduct() {
        this.invoiceFormService.addProduct();
    }

    public removeProduct(index: number) {
        this.invoiceFormService.removeProduct(index);
    }
}

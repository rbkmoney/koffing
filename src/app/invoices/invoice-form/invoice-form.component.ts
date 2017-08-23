import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { map } from 'lodash';

import { SelectItem } from 'koffing/common/select/select-item';
import { InvoiceFormService } from './invoice-form.service';
import { INVOICE_TYPES } from './invoice-types';
import { INVOICE_LINE_TAX_VAT_RATES } from 'koffing/backend/model/invoice-cart/invoice-line-tax-vat-rates';

@Component({
    selector: 'kof-invoice-form',
    templateUrl: './invoice-form.component.pug',
    styleUrls: ['./invoice-form.component.less']
})
export class InvoiceFormComponent implements OnInit {

    @Input()
    public form: FormGroup;

    public invoiceTypesItems: SelectItem[];
    public invoiceLineTaxItems: SelectItem[];
    public minDueDate: Date = moment().toDate();

    constructor(private invoiceFormService: InvoiceFormService) { }

    public ngOnInit() {
        this.invoiceTypesItems = [
            new SelectItem(INVOICE_TYPES.fixed, 'Фиксированная стоимость'),
            new SelectItem(INVOICE_TYPES.cart, 'Список товаров')
        ];
        this.invoiceLineTaxItems = map(INVOICE_LINE_TAX_VAT_RATES, (value) => {
            return new SelectItem(value, value);
        });
    }

    public isSelected(type: string): boolean {
        return this.form.value.selectedInvoiceType === type;
    }

    public addProduct() {
        this.invoiceFormService.addProduct();
    }

    public removeProduct(index: number) {
        this.invoiceFormService.removeProduct(index);
    }
}

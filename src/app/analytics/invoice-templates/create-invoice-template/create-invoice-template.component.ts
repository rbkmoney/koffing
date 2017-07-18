import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SelectItem } from 'koffing/common/select/select-item';
import { InvoiceTemplate } from 'koffing/backend';
import { InvoiceTemplateService } from 'koffing/backend';
import { InvoiceTemplateForm2Service } from './invoice-template-form-2.service';

@Component({
    selector: 'kof-create-invoice-template',
    templateUrl: 'create-invoice-template.component.pug',
    providers: [InvoiceTemplateForm2Service]
})
export class CreateInvoiceTemplateComponent implements OnInit {

    @Input()
    public shopID: string;

    @Output()
    public onCreate: EventEmitter<InvoiceTemplate> = new EventEmitter();

    public form: FormGroup;
    public costTypesItems: SelectItem[] = [];

    constructor(private invoiceTemplateService: InvoiceTemplateService,
                private invoiceTemplateFormService: InvoiceTemplateForm2Service) {
    }

    public ngOnInit() {
        this.form = this.invoiceTemplateFormService.form;
        this.costTypesItems = this.invoiceTemplateFormService.getCostTypesItems();
    }

    public createInvoiceTemplate() {
        const params = this.invoiceTemplateFormService.toInvoiceParams(this.shopID, this.form);
        this.invoiceTemplateService.createInvoiceTemplate(params)
            .subscribe((invoiceTemplate) => this.onCreate.emit(invoiceTemplate));
    }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SelectItem } from 'koffing/common/select/select-item';
import { InvoiceTemplate } from 'koffing/backend';
import { InvoiceTemplateService } from 'koffing/backend';
import { InvoiceTemplateFormParams } from './invoice-template-form-params';
import { InvoiceTemplateFormService } from './invoice-template-form.service';

@Component({
    selector: 'kof-create-invoice-template',
    templateUrl: 'create-invoice-template.component.pug',
    providers: [ InvoiceTemplateFormService ]
})
export class CreateInvoiceTemplateComponent implements OnInit {

    @Input()
    public shopID: string;

    @Output()
    public onCreate: EventEmitter<InvoiceTemplate> = new EventEmitter();
    
    public form: FormGroup;
    public costTypesItems: SelectItem[] = [];
    public isLoading: boolean = false;

    constructor(
        private invoiceTemplateService: InvoiceTemplateService,
        private invoiceTemplateFormService: InvoiceTemplateFormService
    ) { }

    public ngOnInit() {
        this.form = this.invoiceTemplateFormService.initForm();
        this.invoiceTemplateFormService.subscribeCostTypeChanges();
        this.costTypesItems = InvoiceTemplateFormService.getCostTypesItems();
    }

    public createInvoiceTemplate(formParams: InvoiceTemplateFormParams) {
        this.isLoading = true;
        const params = InvoiceTemplateFormService.toSearchParamsFromFormParams(formParams, this.shopID);
        this.invoiceTemplateService.createInvoiceTemplate(params).subscribe((invoiceTemplate) => {
            this.onCreate.emit(invoiceTemplate);
            this.isLoading = false;
        });
    }
}

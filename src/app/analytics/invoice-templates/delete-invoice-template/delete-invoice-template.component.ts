import { Component, Input } from '@angular/core';

import { InvoiceTemplateService } from 'koffing/backend';
import { SearchInvoiceTemplatesBroadcaster } from 'koffing/broadcaster';

@Component({
    selector: 'kof-delete-invoice-template',
    templateUrl: 'delete-invoice-template.component.pug'
})
export class DeleteInvoiceTemplateComponent {

    @Input()
    public invoiceTemplateID: string;

    constructor(
        private invoiceTemplateService: InvoiceTemplateService,
        private searchInvoiceTemplatesBroadcaster: SearchInvoiceTemplatesBroadcaster,
    ) { }

    public deleteInvoiceTemplate() {
        this.invoiceTemplateService.deleteInvoiceTemplate(this.invoiceTemplateID).subscribe(() => {
            this.searchInvoiceTemplatesBroadcaster.fire();
        });
    }
}

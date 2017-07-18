import { Component, Input } from '@angular/core';

import { InvoiceTemplate } from 'koffing/backend';

@Component({
    selector: 'kof-search-details-invoice-template',
    templateUrl: 'search-details-invoice-template.component.pug'
})
export class SearchDetailsInvoiceTemplateComponent {

    @Input()
    public invoiceTemplate: InvoiceTemplate;
}

import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { InvoiceTemplate } from 'koffing/backend/model/invoice-template';
import { DataTransformService } from 'koffing/common/data-transform/data-transform.service';
import { HidingTableItem } from 'koffing/common/data-transform/hiding-table-item';

@Component({
    selector: 'kof-search-result-invoice-templates',
    templateUrl: 'search-result-invoice-templates.component.pug',
})
export class SearchResultInvoiceTemplatesComponent implements OnInit {

    @Input()
    public invoiceTemplates: Observable<InvoiceTemplate[]>;

    public invoiceTemplatesTableItems: Observable<HidingTableItem[]>;

    public ngOnInit() {
        this.invoiceTemplatesTableItems = this.invoiceTemplates
            .map((invoiceTemplates) => DataTransformService.toHidingTableItems(invoiceTemplates, 'invoiceTemplate'))
            .do((invoiceTemplatesTableItem: HidingTableItem[]) => {
                if (invoiceTemplatesTableItem.length === 1) {
                    invoiceTemplatesTableItem[0].visible = true;
                }
            });
    }

    public toggleVisibilityDetailPanel(item: HidingTableItem) {
        item.visible = !item.visible;
    }
}

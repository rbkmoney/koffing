import { Component, Input } from '@angular/core';
import { Invoice } from 'koffing/backend/model/invoice';

@Component({
    selector: 'kof-search-result',
    templateUrl: 'search-result.component.pug'
})
export class SearchResultComponent {

    @Input()
    public invoices: Invoice[];
}

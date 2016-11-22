import {Component, Input} from '@angular/core';

@Component({
    selector: 'search-result',
    templateUrl: 'search-result.component.pug'
})
export class SearchResultComponent {

    @Input() invoices: any;

}


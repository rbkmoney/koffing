import * as _ from 'lodash';
import {Component, Input, OnChanges} from '@angular/core';

@Component({
    selector: 'search-result',
    templateUrl: 'search-result.component.pug'
})
export class SearchResultComponent implements OnChanges {

    @Input() public size: number;


    constructor() {
    }

    ngOnChanges() {

    }

}


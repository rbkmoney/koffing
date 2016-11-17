import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'search-form',
    templateUrl: 'search-form.component.pug'
})
export class SearchFormComponent {

    @Input() searchParams: any;
    @Output() onSearch: EventEmitter<any> = new EventEmitter<any>();

    constructor() {
    }

    search() {
        this.onSearch.emit();
    }

}

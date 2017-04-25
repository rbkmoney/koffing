import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Payment } from 'koffing/backend/model/payment';

@Component({
    selector: 'kof-search-details',
    templateUrl: './search-details.component.pug'
})
export class SearchDetailsComponent {

    @Input()
    public payments: Observable<Payment[]>;

}

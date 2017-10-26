import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Report } from 'koffing/backend';

@Component({
    selector: 'kof-search-reports-result',
    templateUrl: 'search-reports-result.component.pug'
})
export class SearchReportsResultComponent implements OnInit {

    @Input()
    public reports: Observable<Report[]>;

    public ngOnInit() {
        console.log(this.reports);
    }
}

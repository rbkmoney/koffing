import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { isNil } from 'lodash';

import { PanelData } from 'koffing/analytics/statistic-panel/panel-data';

@Component({
    selector: 'kof-statistic-panel',
    templateUrl: './statistic-panel.component.pug'
})
export class StatisticPanelComponent implements OnInit {

    @Input()
    public data: Observable<PanelData>;

    public uniqueCount: Observable<number>;
    public successfulCount: Observable<number>;
    public unfinishedCount: Observable<number>;
    public profit: Observable<number>;
    public guaranteeBalance: Observable<number>;
    public settlementBalance: Observable<number>;

    public ngOnInit() {
        const multicasted = this.data.multicast(new Subject());

        this.uniqueCount = multicasted
            .filter((data: PanelData) => !isNil(data.uniqueCount))
            .map((data: PanelData) => data.uniqueCount);

        this.successfulCount = multicasted
            .filter((data: PanelData) => !isNil(data.successfulCount))
            .map((data: PanelData) => data.successfulCount);

        this.unfinishedCount = multicasted
            .filter((data: PanelData) => !isNil(data.unfinishedCount))
            .map((data: PanelData) => data.unfinishedCount);

        this.profit = multicasted
            .filter((data: PanelData) => !isNil(data.profit))
            .map((data: PanelData) => data.profit);

        this.guaranteeBalance = multicasted
            .filter((data: PanelData) => !isNil(data.guaranteeBalance))
            .map((data: PanelData) => data.guaranteeBalance);

        this.settlementBalance = multicasted
            .filter((data: PanelData) => !isNil(data.settlementBalance))
            .map((data: PanelData) => data.settlementBalance);

        multicasted.connect();
    }
}

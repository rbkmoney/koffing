import { Component, Input, OnInit, OnChanges } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';

import { CHART_OPTIONS } from './../chart-options.const';

@Component({
    selector: 'kof-revenue',
    templateUrl: './revenue.component.pug'
})

export class RevenueComponent implements OnInit, OnChanges {

    @Input()
    public fromTime: any;
    @Input()
    public chartData: any;
    public labels: string[];
    public data: number[] | any[] = [];
    public type: string = 'line';
    public options: any = {
        elements: {
            line: {
                tension: 0
            }
        },
        scales: {
            yAxes: [{
                stacked: true
            }],
            xAxes: [{
                ticks: {
                    fontSize: 10
                }
            }]
        },
        legend: {
            display: false
        }
    };
    public chartColors = [CHART_OPTIONS.LINE.COLORS];

    private isLoading: boolean;

    public ngOnInit() {
        this.isLoading = true;
    }

    public ngOnChanges() {
        if (this.chartData) {
            this.isLoading = false;

            this.labels = _.map(this.chartData,
                (item: any) => moment(this.fromTime).add(item.offset, 's').format('DD.MM HH:mm')
            );
            this.data = _.chain(this.chartData)
                .map(
                    (item: any) => _.round(item.profit / 100, 2)
                ).chunk(this.chartData.length)
                .value();

        }
    }
}

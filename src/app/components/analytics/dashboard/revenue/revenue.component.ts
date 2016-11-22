import { Component, Input, OnChanges } from '@angular/core';
import * as _ from 'lodash';

declare var moment: any;

@Component({
    selector: 'revenue',
    templateUrl: './revenue.component.pug'
})

export class RevenueComponent implements OnChanges{
    @Input() fromTime: any;
    @Input() chartData: any;
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
            }]
        }
    };

    ngOnChanges(): void {
        if (this.chartData) {

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
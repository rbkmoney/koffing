import { Component, Input, OnChanges } from '@angular/core';

import { CHART_OPTIONS } from '../chart-options.const';
import { LineChartData } from 'koffing/analytics/dashboard/chart-data/line-chart-data';

@Component({
    selector: 'kof-conversion',
    templateUrl: './conversion.component.pug'
})
export class ConversionComponent implements OnChanges {

    @Input()
    public chartData: LineChartData;

    public labels: string[];

    public datasets: any[] = [];

    public options: any = {
        elements: {
            line: {
                tension: 0.2
            }
        },
        scales: {
            yAxes: [{
                stacked: true
            }],
            xAxes: [{
                ticks: {
                    fontSize: 11
                }
            }]
        },
        legend: {
            display: false
        }
    };

    public chartColors = [CHART_OPTIONS.LINE.COLORS];

    public ngOnChanges() {
        if (this.chartData) {
            this.datasets.pop();
            this.datasets.push(this.chartData.datasets[0]);
        }
    }
}

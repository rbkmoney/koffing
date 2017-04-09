import { Component, Input } from '@angular/core';

import { CHART_OPTIONS } from '../chart-options.const';
import { DoughnutChartData } from 'koffing/analytics/dashboard/chart-data/doughnut-chart-data';

@Component({
    selector: 'kof-doughnut-chart',
    templateUrl: './doughnut-chart.component.pug'
})
export class DoughnutChartComponent {

    @Input()
    public chartData: DoughnutChartData;

    public options: any = {
        animation: false,
        legend: {
            display: true,
            position: 'left'
        }
    };

    public chartColors = [CHART_OPTIONS.DOUGHNUT.COLORS];
}

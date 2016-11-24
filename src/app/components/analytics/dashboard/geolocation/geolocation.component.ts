import { Component, Input, OnChanges } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'kof-geolocation',
    templateUrl: './geolocation.component.pug'
})
export class GeolocationComponent implements OnChanges {

    @Input()
    public chartData: any;

    public labels: string[];

    public data: number[] = [];

    public type: string = 'doughnut';

    public options: any = {
        animation: false,
        legend: {
            display: true,
            position: 'left'
        }
    };

    public ngOnChanges() {
        if (this.chartData) {
            const grouped: any = _.groupBy(this.chartData, 'cityName');
            const cities: any = _.keys(grouped);
            const data: any[] = [];
            _.forEach(cities, city => {
                const accumulatedValue = _.reduce(grouped[city], (acc: any, item: any) => acc + item.profit, 0);
                data.push(accumulatedValue / 100);
            });
            this.labels = cities;
            this.data = data;
        }
    }
}

import { Component, Input, OnChanges } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'geolocation',
    templateUrl: './geolocation.component.pug'
})

export class GeolocationComponent implements OnChanges{
    @Input() chartData: any;

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

    ngOnChanges() {
        let grouped;
        let cities;
        let data;

        if (this.chartData) {

            grouped = _.groupBy(this.chartData, 'cityName');
            cities = _.keys(grouped);
            data = [];

            _.forEach(cities, city => data.push(
                _.chain(grouped[city])
                    .reduce((acc, item) => acc + item.profit, 0)
                    .divide(100)
                    .value()
            ));

            this.labels = cities;
            this.data = data;

        }
    }
}
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
        let grouped: any;
        let cities: any;
        let data: any[];

        if (this.chartData) {
            grouped = _.groupBy(this.chartData, 'cityName');
            cities = _.keys(grouped);
            data = [];

            _.forEach(cities, city => {
                let accumulatedValue = _.reduce(grouped[city], (acc: any, item: any) => acc + item.profit, 0);
                data.push(accumulatedValue/100)
            });

            this.labels = cities;
            this.data = data;

        }
    }
}
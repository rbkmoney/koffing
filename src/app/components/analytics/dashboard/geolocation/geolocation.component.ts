import { Component, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'geolocation',
    templateUrl: './geolocation.component.pug'
})

export class GeolocationComponent implements OnChanges{
    @Input() chartData: any;

    public labels: string[];
    public data: number[] = [];
    public type: string = 'pie';
    public options: any = {
        animation: false
    };

    ngOnChanges() {
        if (this.chartData) {

        }
    }
}
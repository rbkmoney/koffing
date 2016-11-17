import { Component, Input } from '@angular/core';

@Component({
    selector: 'revenue',
    templateUrl: './revenue.component.pug'
})

export class RevenueComponent {
    @Input() fromTime: any;
    @Input() chartData: any;
}
import { Component, Input } from '@angular/core';

@Component({
    selector: 'conversion',
    templateUrl: './conversion.component.pug'
})

export class ConversionComponent {
    @Input() fromTime: any;
    @Input() chartData: any;
}
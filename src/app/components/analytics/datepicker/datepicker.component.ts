import { Component, Input } from '@angular/core';

@Component({
    selector: 'datepicker',
    templateUrl: './datepicker.component.pug'
})

export class DatepickerComponent {
    @Input() date: any;
}
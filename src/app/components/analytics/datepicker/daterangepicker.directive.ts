import {Directive, ElementRef} from '@angular/core';

const libConfig = {
    singleDatePicker: true,
    calender_style: 'picker_2',
    locale: {
        daysOfWeek: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    },
    autoUpdateInput: false
};

@Directive({
    selector: '[daterangepicker]'
})
export class DaterangepickerDirective{

    constructor(private elementRef: ElementRef){


    }
}
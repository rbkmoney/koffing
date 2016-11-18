import {Directive, ElementRef, Renderer, HostListener} from '@angular/core';
import * as moment from 'moment';

declare const daterangepicker;
declare const jQuery;

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

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer
    ){
        let $element = jQuery(elementRef.nativeElement);
        debugger;
        $element.daterangepicker(libConfig);

        $element.on('apply.daterangepicker', (ev, picker) => {
            let formatted = moment(picker.startDate).format();
            debugger;
        })
    }

    @HostListener('click') onClick() {
        debugger
    }
}
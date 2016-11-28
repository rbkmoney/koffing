import { Component, Input, OnChanges, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { CustomFormControl } from './custom-form-control.class';

export const datepickerValueAccessor: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatepickerComponent),
    multi: true
};

@Component({
    selector: 'datepicker',
    templateUrl: './datepicker.component.pug',
    styleUrls: ['./datepicker.component.less']
})
export class DatepickerComponent extends CustomFormControl {
    @Input()
    public name: string;

    public kohDate: any = null;

    //Placeholders for the callbacks which are later providesd
    //by the Control Value Accessor
    protected onTouchedCallback: () => void = () => {
        debugger;
    };
    protected onChangeCallback: (_: any) => void = (value) => {
        debugger;
        this.kohDate = value;
    };

    //get accessor
    get value(): any {
        debugger;
        return this.innerValue;
    };

    //set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this.innerValue) {
            debugger;
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }

    private OnChanges() {
        debugger;
    }
}
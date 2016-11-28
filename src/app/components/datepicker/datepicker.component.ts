import { Component, Input, OnChanges, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const datepickerValueAccessor: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatepickerComponent),
    multi: true
};

@Component({
    selector: 'datepicker',
    templateUrl: './datepicker.component.pug',
    styleUrls: ['./datepicker.component.less'],
    providers: [datepickerValueAccessor]
})
export class DatepickerComponent implements ControlValueAccessor {

    //The internal data model
    public innerValue: any = '';

    //Placeholders for the callbacks which are later providesd
    //by the Control Value Accessor
    private onTouchedCallback: () => void = () => {
        debugger;
    };
    private onChangeCallback: (_: any) => void = (value) => {
        debugger;
    };

    //get accessor
    get value(): any {
        debugger;
        return this.innerValue;
    };

    //set accessor including call the onchange callback
    set value(v: any) {
        debugger;
        if (v !== this.innerValue) {
            debugger;
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }

    //Set touched on blur
    onBlur() {
        debugger;
        this.onTouchedCallback();
    }

    //From ControlValueAccessor interface
    writeValue(value: any) {
        if (value !== this.innerValue) {
            debugger;
            this.innerValue = value;
        }
    }

    //From ControlValueAccessor interface
    registerOnChange(fn: any) {
        debugger;
        this.onChangeCallback = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        debugger;
        this.onTouchedCallback = fn;
    }

    private OnChanges() {
        debugger;
    }
}
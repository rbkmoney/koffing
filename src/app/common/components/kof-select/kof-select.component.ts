import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { SelectItem } from '../../classes/kof-select.class';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => KofSelectComponent),
    multi: true
};

@Component({
    selector: 'kof-select',
    templateUrl: 'kof-select.component.pug',
    styleUrls: ['kof-select.component.less'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class KofSelectComponent {

    @Input()
    public items: SelectItem[];

    @Input()
    public placeholder: any;

    @Input()
    public modelOptions: any;

    @Output()
    public onChange: EventEmitter<any> = new EventEmitter<any>();

    private innerSelectedValue: any = '';
    private onTouchedCallback: Function;
    private onChangeCallback: Function;

    public onSelect() {
        this.onChange.emit();
    }

    get selectedValue(): any {
        return this.innerSelectedValue;
    };

    set selectedValue(v: any) {
        if (v !== this.innerSelectedValue) {
            this.innerSelectedValue = v;
            this.onChangeCallback(v);
        }
    }

    public writeValue(value: any) {
        if (value !== this.innerSelectedValue) {
            this.innerSelectedValue = value;
        }
    }

    public registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

}

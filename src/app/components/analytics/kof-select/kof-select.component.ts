import { Component, Input, Output, EventEmitter } from '@angular/core';

import { SelectItem } from './kof-select.class';

@Component({
    selector: 'kof-select',
    templateUrl: 'kof-select.component.pug',
    styleUrls: ['kof-select.component.less']
})
export class KofSelectComponent {

    //todo: реализовать двустороннюю связанность для модели
    @Input()
    public model: SelectItem;

    @Input()
    public items: SelectItem[];

    @Input()
    public placeholder: any;

    @Input()
    public modelOptions: any;

    @Output()
    public onChange: EventEmitter<any> = new EventEmitter<any>();

    public onSelect(value: string) {
        this.onChange.emit(value);
    }

}

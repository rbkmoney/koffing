import { Component, Input } from '@angular/core';

@Component({
    selector: 'kof-modification-detail',
    templateUrl: 'modification-detail.component.pug'
})
export class ModificationDetailComponent {

    @Input()
    public name: string;

    @Input()
    public value: string;
}

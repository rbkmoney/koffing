import { Component, Input } from '@angular/core';

@Component({
    selector: 'kof-modification-detail',
    templateUrl: 'modification-detail.component.pug',
    styleUrls: [`.modification-detail-value { word-wrap: break-word }`]
})
export class ModificationDetailComponent {

    @Input()
    public name: string;

    @Input()
    public value: string;
}

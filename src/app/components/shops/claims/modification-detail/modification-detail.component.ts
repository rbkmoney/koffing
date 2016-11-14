import { Component, Input } from '@angular/core';

@Component({
    selector: 'modification-detail',
    templateUrl: './modification-detail.component.pug',
    styleUrls: ['./modification-detail.component.css']
})

export class ModificationDetailComponent {
    @Input() displayName: string;
    @Input() value: string;
}
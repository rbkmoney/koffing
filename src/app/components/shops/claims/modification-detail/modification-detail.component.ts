import { Component, Input } from '@angular/core';

@Component({
    selector: 'modification-detail',
    templateUrl: './modification-detail.component.pug'
})

export class ModificationDetailComponent {
    @Input() displayName: string;
    @Input() value: string;
}
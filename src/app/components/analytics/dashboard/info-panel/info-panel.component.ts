import { Component, Input } from '@angular/core';

@Component({
    selector: 'info-panel',
    templateUrl: './info-panel.component.pug'
})

export class InfoPanelComponent {
    @Input() uniqueCount: any;
    @Input() successfulCount: any;
    @Input() unfinishedCount: any;
    @Input() profit: any;
    @Input() account: any;
}
import { Component, Input } from '@angular/core';

@Component({
    selector: 'kof-info-panel',
    templateUrl: './info-panel.component.pug'
})
export class InfoPanelComponent {

    @Input()
    public uniqueCount: any;
    @Input()
    public successfulCount: any;
    @Input()
    public unfinishedCount: any;
    @Input()
    public profit: any;
    @Input()
    public settlementAccount: any;
    @Input()
    public guaranteeAccount: any;
    @Input()
    public isLoading: boolean;
}

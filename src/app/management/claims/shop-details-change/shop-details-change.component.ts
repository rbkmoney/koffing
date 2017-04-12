import { Component, Input } from '@angular/core';

@Component({
    selector: 'kof-shop-details-change',
    templateUrl: 'shop-details-change.component.pug'
})
export class ShopDetailsChangeComponent {

    @Input()
    public changeSet: any;

    public showPanel: boolean = false;

    public show() {
        this.showPanel = !this.showPanel;
    }
}

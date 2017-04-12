import { Component, Input } from '@angular/core';

@Component({
    selector: 'kof-shop-location-change',
    templateUrl: 'shop-location-change.component.pug'
})
export class ShopLocationChangeComponent {

    @Input()
    public changeSet: any;

    public showPanel: boolean = false;

    public show() {
        this.showPanel = !this.showPanel;
    }
}

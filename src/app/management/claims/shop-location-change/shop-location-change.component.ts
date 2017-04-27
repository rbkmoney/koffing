import { Component, Input } from '@angular/core';

import { ShopLocationChange } from 'koffing/backend/backend.module';

@Component({
    selector: 'kof-shop-location-change',
    templateUrl: 'shop-location-change.component.pug'
})
export class ShopLocationChangeComponent {

    @Input()
    public changeSet: ShopLocationChange;

    public showPanel: boolean = false;

    public show() {
        this.showPanel = !this.showPanel;
    }
}

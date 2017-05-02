import { Component, Input } from '@angular/core';

import { ShopDetailsChange } from 'koffing/backend/model/claim/shop-modification/shop-details-change.class';

@Component({
    selector: 'kof-shop-details-change',
    templateUrl: 'shop-details-change.component.pug'
})
export class ShopDetailsChangeComponent {

    @Input()
    public changeSet: ShopDetailsChange;

    public showPanel: boolean = false;

    public show() {
        this.showPanel = !this.showPanel;
    }
}

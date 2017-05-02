import { Component, Input } from '@angular/core';

import { ShopAccountCreation } from 'koffing/backend/model/claim/shop-modification/shop-account-creation.class';

@Component({
    selector: 'kof-shop-account-creation',
    templateUrl: 'shop-account-creation.component.pug'
})
export class ShopAccountCreationComponent {

    @Input()
    public changeSet: ShopAccountCreation;

    public showPanel: boolean = false;

    public show() {
        this.showPanel = !this.showPanel;
    }
}

import { Component, Input } from '@angular/core';

import { ShopCreation } from 'koffing/backend/backend.module';

@Component({
    selector: 'kof-shop-creation',
    templateUrl: 'shop-creation.component.pug'
})
export class ShopCreationComponent {

    @Input()
    public changeSet: ShopCreation;

    public showPanel: boolean = false;

    public show() {
        this.showPanel = !this.showPanel;
    }
}

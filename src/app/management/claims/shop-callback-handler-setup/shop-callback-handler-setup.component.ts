import { Component, Input } from '@angular/core';

import { ShopCallbackHandlerSetup } from 'koffing/backend/backend.module';

@Component({
    selector: 'kof-shop-callback-handler-setup',
    templateUrl: 'shop-callback-handler-setup.component.pug'
})
export class ShopCallbackHandlerSetupComponent {

    @Input()
    public changeSet: ShopCallbackHandlerSetup;

    public showPanel: boolean = false;

    public show() {
        this.showPanel = !this.showPanel;
    }
}

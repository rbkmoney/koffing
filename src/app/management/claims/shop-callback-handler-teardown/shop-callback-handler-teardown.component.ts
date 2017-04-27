import { Component, Input } from '@angular/core';

import { ShopCallbackHandlerTeardown } from 'koffing/backend/backend.module';

@Component({
    selector: 'kof-shop-callback-handler-teardown',
    templateUrl: 'shop-callback-handler-teardown.component.pug'
})
export class ShopCallbackHandlerTeardownComponent {

    @Input()
    public changeSet: ShopCallbackHandlerTeardown;

    public showPanel: boolean = false;

    public show() {
        this.showPanel = !this.showPanel;
    }
}

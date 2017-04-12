import { Component, Input } from '@angular/core';

@Component({
    selector: 'kof-shop-callback-handler-teardown',
    templateUrl: 'shop-callback-handler-teardown.component.pug'
})
export class ShopCallbackHandlerTeardownComponent {

    @Input()
    public changeSet: any;

    public showPanel: boolean = false;

    public show() {
        this.showPanel = !this.showPanel;
    }
}

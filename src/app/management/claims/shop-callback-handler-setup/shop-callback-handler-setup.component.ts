import { Component, Input } from '@angular/core';

@Component({
    selector: 'kof-shop-callback-handler-setup',
    templateUrl: 'shop-callback-handler-setup.component.pug'
})
export class ShopCallbackHandlerSetupComponent {

    @Input()
    public changeSet: any;

    public showPanel: boolean = false;

    public show() {
        this.showPanel = !this.showPanel;
    }
}

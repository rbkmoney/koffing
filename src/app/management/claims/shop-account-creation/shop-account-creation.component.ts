import { Component, Input } from '@angular/core';

@Component({
    selector: 'kof-shop-account-creation',
    templateUrl: 'shop-account-creation.component.pug'
})
export class ShopAccountCreationComponent {

    @Input()
    public changeSet: any;

    public showPanel: boolean = false;

    public show() {
        this.showPanel = !this.showPanel;
    }
}

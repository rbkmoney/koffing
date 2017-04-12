import { Component, Input } from '@angular/core';

@Component({
    selector: 'kof-shop-creation',
    templateUrl: 'shop-creation.component.pug'
})
export class ShopCreationComponent {

    @Input()
    public changeSet: any;

    public showPanel: boolean = false;

    public show() {
        this.showPanel = !this.showPanel;
    }
}

import { Component, Input } from '@angular/core';

@Component({
    selector: 'kof-shop-category-change',
    templateUrl: 'shop-category-change.component.pug'
})
export class ShopCategoryChangeComponent {

    @Input()
    public changeSet: any;

    public showPanel: boolean = false;

    public show() {
        this.showPanel = !this.showPanel;
    }
}

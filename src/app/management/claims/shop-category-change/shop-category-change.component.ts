import { Component, Input } from '@angular/core';

import { ShopCategoryChange } from 'koffing/backend/backend.module';

@Component({
    selector: 'kof-shop-category-change',
    templateUrl: 'shop-category-change.component.pug'
})
export class ShopCategoryChangeComponent {

    @Input()
    public changeSet: ShopCategoryChange;

    public showPanel: boolean = false;

    public show() {
        this.showPanel = !this.showPanel;
    }
}

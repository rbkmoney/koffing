import { Component, Input } from '@angular/core';

import { ShopContractBinding } from 'koffing/backend/backend.module';

@Component({
    selector: 'kof-shop-contract-binding',
    templateUrl: 'shop-contract-binding.component.pug'
})
export class ShopContractBindingComponent {

    @Input()
    public changeSet: ShopContractBinding;

    public showPanel: boolean = false;

    public show() {
        this.showPanel = !this.showPanel;
    }
}

import { Component, Input } from '@angular/core';

@Component({
    selector: 'kof-shop-contract-binding',
    templateUrl: 'shop-contract-binding.component.pug'
})
export class ShopContractBindingComponent {

    @Input()
    public changeSet: any;

    public showPanel: boolean = false;

    public show() {
        this.showPanel = !this.showPanel;
    }
}

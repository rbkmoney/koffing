import { Component, Input, Output, EventEmitter } from '@angular/core';

import { HttpShopService } from 'koffing/backend/backend.module';
import { Shop } from 'koffing/backend/backend.module';

@Component({
    selector: 'kof-shop-details-panel',
    templateUrl: 'shop-details-panel.component.pug',
    styleUrls: [`
        .public-key-container {
            max-width: 900px;
            word-wrap: break-word;
        }`]
})
export class ShopDetailsPanelComponent {
    
    @Input()
    public shop: Shop;

    @Output()
    public onChange = new EventEmitter();
    
    constructor(
        private shopService: HttpShopService
    ) { }
    
    public suspendShop() {
        this.shopService.suspendShop(this.shop.id).then(() => this.onChange.emit());
    }

    public activateShop() {
        this.shopService.activateShop(this.shop.id).then(() => this.onChange.emit());
    }
}

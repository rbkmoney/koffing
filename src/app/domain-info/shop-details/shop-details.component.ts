import { Component, Input } from '@angular/core';
import { Shop, Category } from 'koffing/backend';

@Component({
    selector: 'kof-shop-details',
    templateUrl: 'shop-details.component.pug'
})
export class ShopDetailsComponent {

    @Input()
    public shop: Shop;

    @Input()
    public category: Category;

    public getShopLabel(): string {
        if (this.shop) {
            return this.shop.isBlocked ? 'label-danger' : this.shop.isSuspended ? 'label-warning' : 'label-success';
        }
    }

    public getShopStatus(): string {
        if (this.shop) {
            return this.shop.isBlocked ? 'Заблокирован' : this.shop.isSuspended ? 'Заморожен' : 'Активен';
        }
    }
}

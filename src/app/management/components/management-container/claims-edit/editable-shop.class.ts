import { Shop } from 'koffing/backend/classes/shop.class';
import { ShopParams } from 'koffing/backend/classes/shop-params.class';

export class EditableShop {
    public shop: Shop;
    public updateShopParams: ShopParams;
    public valid: boolean;
    public dirty: boolean;

    constructor() {
        this.shop = new Shop();
        this.updateShopParams = new ShopParams();
        this.valid = false;
        this.dirty = false;
    }
}

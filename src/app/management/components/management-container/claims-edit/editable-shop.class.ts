import { Shop } from 'koffing/backend/classes/shop.class';
import { UpdateShopParams } from 'koffing/backend/classes/update-shop-params.class';

export class EditableShop {
    public shop: Shop;
    public updateShopParams: UpdateShopParams;
    public valid: boolean;
    public dirty: boolean;

    constructor() {
        this.shop = new Shop();
        this.updateShopParams = new UpdateShopParams();
        this.valid = false;
        this.dirty = false;
    }
}

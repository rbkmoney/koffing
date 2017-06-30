import { Shop } from 'koffing/backend/model/shop.class';
import { ShopParams } from 'koffing/backend/classes/shop-params.class';

export class ShopEditingParams {
    public shop: Shop;
    public claimShopChanges: ShopParams;
    public updatedShopParams: ShopParams;
    public valid: boolean;
    public dirty: boolean;

    constructor() {
        this.shop = new Shop();
        this.claimShopChanges = new ShopParams();
        this.updatedShopParams = new ShopParams();
        this.valid = false;
        this.dirty = false;
    }
}

import { UpdateShopParams } from 'koffing/backend/classes/update-shop-params.class';

export class ShopEditingTransfer {
    public shopEditing: UpdateShopParams;
    public valid: boolean;
    public dirty: boolean;

    constructor(shopEditing: UpdateShopParams, valid: boolean, dirty: boolean) {
        this.shopEditing = shopEditing;
        this.valid = valid;
        this.dirty = dirty;
    }
}

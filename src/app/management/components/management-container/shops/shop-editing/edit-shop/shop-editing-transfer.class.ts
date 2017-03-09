import { CreateShopArgs } from 'koffing/backend/classes/create-shop-args.class';

export class ShopEditingTransfer {
    public shopEditing: CreateShopArgs;
    public valid: boolean;
    public dirty: boolean;

    constructor(shopEditing: CreateShopArgs, valid: boolean, dirty: boolean) {
        this.shopEditing = shopEditing;
        this.valid = valid;
        this.dirty = dirty;
    }
}

import { Shop } from 'koffing/backend/classes/shop.class';
import { CreateShopArgs } from 'koffing/backend/classes/create-shop-args.class';

export class EditableShop {
    public shop: Shop;
    public createShopArgs: CreateShopArgs;
    public valid: boolean;
    public dirty: boolean;

    constructor() {
        this.shop = new Shop();
        this.createShopArgs = new CreateShopArgs();
        this.valid = false;
        this.dirty = false;
    }
}

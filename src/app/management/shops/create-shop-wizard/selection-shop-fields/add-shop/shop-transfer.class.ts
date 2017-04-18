import { Shop } from 'koffing/backend/backend.module';

export class ShopTransfer {
    public shop: Shop;
    public valid: boolean;

    constructor(shop?: Shop, valid?: boolean) {
        this.shop = shop;
        this.valid = valid;
    }
}

import { Shop } from 'koffing/backend/model/shop/shop.class';

export class ShopTransfer {
    public shop: Shop;
    public valid: boolean;

    constructor(shop?: Shop, valid?: boolean) {
        this.shop = shop;
        this.valid = valid;
    }
}

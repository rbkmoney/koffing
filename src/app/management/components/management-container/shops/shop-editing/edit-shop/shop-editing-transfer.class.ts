import { CreateShopArgs } from 'koffing/backend/classes/create-shop-args.class';

export class ShopEditingTransfer {
    public shopEditing: CreateShopArgs;
    public ready: boolean;

    constructor(shopEditing: CreateShopArgs, ready: boolean) {
        this.shopEditing = shopEditing;
        this.ready = ready;
    }
}

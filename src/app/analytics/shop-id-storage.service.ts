import * as _ from 'lodash';

import { Shop } from 'koffing/backend/model/shop/shop.class';

export class ShopIDStorage {

    public static key: string = 'activeShop';

    public static set(shopID: string) {
        localStorage.setItem(this.key, _.toString(shopID));
    }

    public static get(): string {
        const id = localStorage.getItem('activeShop');
        return id ? _.toString(id) : '';
    }

    public static isAvailable(shops: Shop[]) {
        const id = this.get();
        return id ? !!_.find(shops, (shop) => id === shop.id) : false;
    }
}

import * as _ from 'lodash';

export class ShopIDStorage {

    public static key: string = 'activeShop';

    public static set(shopID: number) {
        localStorage.setItem(this.key, _.toString(shopID));
    }

    public static get(): number {
        const id = localStorage.getItem('activeShop');
        return id ? _.toNumber(id) : null;
    }

    public static isAvailable(shops: any[]) {
        const id = this.get();
        return id ? !!_.find(shops, (shop) => id === shop.id) : false;
    }
}

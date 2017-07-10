import { ShopLocation } from './shop-location';

export class ShopLocationUrl extends ShopLocation {

    constructor() {
        super();
        this.locationType = 'ShopLocationUrl';
    }

    public url: string;
}

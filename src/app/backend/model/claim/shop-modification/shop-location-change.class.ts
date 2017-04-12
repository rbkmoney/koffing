import { ShopModification } from '../shop-modification.class';
import { ShopLocation } from '../../shop/shop-location.class';

export class ShopLocationChange extends ShopModification {
    public location: ShopLocation;

    constructor() {
        super();
        this.shopModificationType = 'ShopLocationChange';
    }
}

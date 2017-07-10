import { ShopModification } from './shop-modification';
import { ShopLocation } from '../../../shop-location';

export class ShopLocationChange extends ShopModification {

    constructor() {
        super();
        this.shopModificationType = 'ShopLocationChange';
    }

    public location: ShopLocation;
}
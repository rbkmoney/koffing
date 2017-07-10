import { ShopModification } from './shop-modification';
import { ShopLocation } from '../../../shop/shop-location/shop-location';
import { ShopDetails } from '../../../shop/shop-details';

export class ShopCreation extends ShopModification {

    constructor() {
        super();
        this.shopModificationType = 'ShopCreation';
    }

    public location: ShopLocation;
    public details: ShopDetails;
    public contractID: string;
    public payoutToolID: string;
}

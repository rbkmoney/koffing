import { ShopModification } from '../shop-modification.class';
import { ShopDetails } from '../../shop/shop-details.class';
import { ShopLocation } from '../../shop/shop-location.class';

export class ShopCreation extends ShopModification {
    public contractID: string;
    public payoutToolID: string;
    public details: ShopDetails;
    public location: ShopLocation;

    constructor() {
        super();
        this.shopModificationType = 'ShopCreation';
    }
}

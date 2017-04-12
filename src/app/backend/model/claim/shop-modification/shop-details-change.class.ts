import { ShopModification } from '../shop-modification.class';
import { ShopDetails } from '../../shop-details.class';

export class ShopDetailsChange extends ShopModification {
    public details: ShopDetails;

    constructor() {
        super();
        this.shopModificationType = 'ShopDetailsChange';
    }
}

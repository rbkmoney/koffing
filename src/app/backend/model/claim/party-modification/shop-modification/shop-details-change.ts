import { ShopModification } from './shop-modification';
import { ShopDetails } from '../../../shop-details';

export class ShopDetailsChange extends ShopModification {

    public details: ShopDetails;

    constructor() {
        super();
        this.shopModificationType = 'ShopDetailsChange';
    }
}

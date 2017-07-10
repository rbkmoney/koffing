import { ShopModification } from './shop-modification';
import { ShopDetails } from '../../../shop-details';

export class ShopDetailsChange extends ShopModification {

    constructor() {
        super();
        this.shopModificationType = 'ShopDetailsChange';
    }

    public details: ShopDetails;
}

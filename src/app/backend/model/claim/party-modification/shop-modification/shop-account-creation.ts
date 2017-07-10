import { ShopModification } from './shop-modification';

export class ShopAccountCreation extends ShopModification {

    constructor() {
        super();
        this.shopModificationType = 'ShopAccountCreation';
    }

    public currency: string;
}

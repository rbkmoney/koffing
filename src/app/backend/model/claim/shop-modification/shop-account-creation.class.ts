import { ShopModification } from '../shop-modification.class';

export class ShopAccountCreation extends ShopModification {
    public currency: string;

    constructor() {
        super();
        this.shopModificationType = 'ShopAccountCreation';
    }
}

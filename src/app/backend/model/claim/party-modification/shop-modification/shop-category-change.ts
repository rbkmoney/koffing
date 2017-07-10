import { ShopModification } from './shop-modification';

export class ShopCategoryChange extends ShopModification {

    constructor() {
        super();
        this.shopModificationType = 'ShopCategoryChange';
    }

    public categoryID: number;
}

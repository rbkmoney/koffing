import { ShopModification } from '../shop-modification.class';

export class ShopCategoryChange extends ShopModification {
    public categoryID: number;

    constructor() {
        super();
        this.shopModificationType = 'ShopCategoryChange';
    }
}

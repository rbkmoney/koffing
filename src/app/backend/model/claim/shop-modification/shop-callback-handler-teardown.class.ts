import { ShopModification } from '../shop-modification.class';

export class ShopCallbackHandlerTeardown extends ShopModification {
    constructor() {
        super();
        this.shopModificationType = 'ShopCallbackHandlerTeardown';
    }
}

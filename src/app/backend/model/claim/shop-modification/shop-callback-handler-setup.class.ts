import { ShopModification } from '../shop-modification.class';

export class ShopCallbackHandlerSetup extends ShopModification {
    public url: string;

    constructor() {
        super();
        this.shopModificationType = 'ShopCallbackHandlerSetup';
    }
}

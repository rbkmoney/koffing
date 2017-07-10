import { ShopModification } from './shop-modification';

export class ShopContractBinding extends ShopModification {

    constructor() {
        super();
        this.shopModificationType = 'ShopContractBinding';
    }

    public contractID: string;
    public payoutToolID: string;
}

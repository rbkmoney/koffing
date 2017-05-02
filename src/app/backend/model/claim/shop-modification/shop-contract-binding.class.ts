import { ShopModification } from '../shop-modification.class';

export class ShopContractBinding extends ShopModification {
    public contractID: string;
    public payoutToolID: string;

    constructor() {
        super();
        this.shopModificationType = 'ShopContractBinding';
    }
}

import { ShopModification } from '../shop-modification.class';

export class ShopCreation extends ShopModification {
    public contractID: string;
    public payoutToolID: string;
    public details: any;
    public location: any;

    constructor(shopID?: string) {
        super();
        this.shopModificationType = 'ShopCreation';
        this.shopID = shopID;
    }
}

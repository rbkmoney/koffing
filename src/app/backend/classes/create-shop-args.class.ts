import { ShopDetail } from 'koffing/backend/classes/shop-detail.class';

export class CreateShopArgs {
    public categoryID: number;
    public details: ShopDetail;
    public contractID: number;
    public payoutToolID: number;
    public callbackUrl: string;

    constructor(
        categoryID?: number,
        details?: ShopDetail,
        contractID?: number,
        payoutToolID?: number,
        callbackUrl?: string
    ) {
        this.categoryID = categoryID;
        this.details = details;
        this.contractID = contractID;
        this.payoutToolID = payoutToolID;
        this.callbackUrl = callbackUrl;
    }
}

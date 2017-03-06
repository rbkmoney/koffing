import { ShopDetails } from 'koffing/backend/backend.module';

export class CreateShopArgs {
    public categoryID: number;
    public details: ShopDetails;
    public contractID: number;
    public payoutToolID: number;
    public callbackUrl: string;

    constructor(
        categoryID?: number,
        details?: ShopDetails,
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

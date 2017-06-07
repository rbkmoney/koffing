import { ShopDetails } from 'koffing/backend/backend.module';

export class ShopDetailTransfer {
    public shopDetail: ShopDetails;
    public categoryID: number;
    public valid: boolean;

    constructor(shopDetail: ShopDetails, categoryID: number, valid: boolean) {
        this.shopDetail = shopDetail;
        this.categoryID = categoryID;
        this.valid = valid;
    }
}

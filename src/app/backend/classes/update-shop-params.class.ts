import { ShopDetails } from 'koffing/backend/backend.module';

export class UpdateShopParams {

    public categoryID: number;
    public details: ShopDetails;
    public contractID: number;
    public payoutToolID: number;
    public callbackUrl: string;
}

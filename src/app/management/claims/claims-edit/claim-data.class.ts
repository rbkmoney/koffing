import { PayoutToolParams } from 'koffing/backend/model/payout-tool-params.class';
import { Contractor } from 'koffing/backend/model/contractor.class';
import { Shop } from 'koffing/backend/model/shop.class';
import { ShopEditingParams } from './shop-editing-params.class';

export class ClaimData {

    public claimID: number;
    public payoutToolParams: PayoutToolParams;
    public payoutToolContractId: number;
    public contractor: Contractor;
    public shop: Shop;
    public shopEditingParams: ShopEditingParams;
}

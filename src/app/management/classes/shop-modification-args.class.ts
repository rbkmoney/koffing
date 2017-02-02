import { Contract } from 'koffing/backend/classes/contract.class';
import { PayoutTool } from 'koffing/backend/classes/payout-tool.class';
import { Shop } from 'koffing/backend/backend.module';

export class ShopModificationArgs {
    public contracts: Contract[];
    public contract: Contract;
    public payoutAccount: PayoutTool;
    public shopFields: Shop;
    public isNewContract: boolean = false;
    public isLoading: boolean = false;
}

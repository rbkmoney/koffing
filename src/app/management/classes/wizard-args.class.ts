import { Contract } from 'koffing/backend/classes/contract.class';
import { PayoutAccount } from 'koffing/backend/classes/payout-account.class';
import { ShopArgs } from 'koffing/management/classes/shop-args.class';

export class WizardArgs {
    public contracts: Contract[];
    public contract: Contract;
    public payoutAccount: PayoutAccount;
    public shopFields: ShopArgs;
    public isNewContract: boolean;
    public isNewPayoutAccount: boolean;
    public isLoading: boolean;
}

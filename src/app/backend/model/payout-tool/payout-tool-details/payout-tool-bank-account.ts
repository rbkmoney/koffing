import { PayoutToolDetails } from './payout-tool-details';
import { BankAccount } from '../../bank-account';

export class PayoutToolBankAccount extends PayoutToolDetails {

    constructor() {
        super();
        this.type = 'PayoutToolBankAccount';
    }

    public bankAccount: BankAccount;
}

import { PayoutToolDetails } from './payout-tool-details.class';
import { BankAccount } from './bank-account.class';

export class PayoutToolBankAccount extends PayoutToolDetails {
    public bankAccount: BankAccount;

    constructor() {
        super();
        this.type = 'PayoutToolBankAccount';
        this.bankAccount = new BankAccount();
    }
}

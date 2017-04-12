import { PayoutToolParams } from '../classes/payout-tool-params.class';
import { BankAccount } from './bank-account.class';

export class PayoutToolBankAccount extends PayoutToolParams {
    public bankAccount: BankAccount;

    constructor() {
        super();
        this.payoutToolType = 'PayoutToolBankAccount';
    }
}

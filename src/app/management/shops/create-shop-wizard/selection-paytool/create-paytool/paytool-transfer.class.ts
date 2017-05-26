import { PayoutToolBankAccount } from 'koffing/backend/model/contract/payout-tool-bank-account.class';

export class PayoutToolTransfer {
    public payoutToolBankAccount: PayoutToolBankAccount;
    public valid: boolean;

    constructor(payoutToolBankAccount: PayoutToolBankAccount, valid: boolean) {
        this.payoutToolBankAccount = payoutToolBankAccount;
        this.valid = valid;
    }
}

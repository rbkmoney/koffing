import { BankAccount } from '../../bank-account';

export class PayoutToolDetailsBankAccount extends BankAccount {

    public detailsType: string;

    constructor(bankAccount: BankAccount) {
        super();
        this.detailsType = 'PayoutToolDetailsBankAccount';
        this.account = bankAccount.account;
        this.bankName = bankAccount.bankName;
        this.bankPostAccount = bankAccount.bankPostAccount;
        this.bankBik = bankAccount.bankBik;
    }
}

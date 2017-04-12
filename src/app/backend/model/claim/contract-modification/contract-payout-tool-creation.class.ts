import { ContractModification } from '../contract-modification.class';
import { BankAccount } from '../../bank-account.class';

export class ContractPayoutToolCreation extends ContractModification {
    public payoutToolID: string;
    public currency: string;
    public payoutToolType: string;
    public bankAccount: BankAccount;

    constructor(payoutToolID?: string) {
        super();
        this.contractModificationType = 'ContractPayoutToolCreation';
        this.payoutToolID = payoutToolID;
        this.payoutToolType = 'PayoutToolBankAccount';
        this.bankAccount = new BankAccount();
    }
}

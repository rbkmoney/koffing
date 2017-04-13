import { ContractModification } from '../contract-modification.class';
import { BankAccount } from '../../contract/bank-account.class';

export class ContractPayoutToolCreation extends ContractModification {
    public payoutToolID: string;
    public currency: string;
    public payoutToolType: string;
    public bankAccount: BankAccount;

    constructor() {
        super();
        this.contractModificationType = 'ContractPayoutToolCreation';
        this.payoutToolType = 'PayoutToolBankAccount';
        this.bankAccount = new BankAccount();
    }
}

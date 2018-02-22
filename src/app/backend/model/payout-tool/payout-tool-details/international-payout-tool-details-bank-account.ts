import { InternationalBankAccount, PayoutToolDetails } from 'koffing/backend';
import { applyMixins } from 'koffing/backend/helpers/applyMixins';

export class PayoutToolDetailsInternationalBankAccount implements PayoutToolDetails, InternationalBankAccount {
    public detailsType: string;
    public accountHolder: string;
    public bankName: string;
    public bankAddress: string;
    public iban: string;
    public bic: string;

    constructor(options: InternationalBankAccount) {
        this.detailsType = 'PayoutToolDetailsInternationalBankAccount';
        this.accountHolder = options.accountHolder;
        this.bankName = options.bankName;
        this.bankAddress = options.bankAddress;
        this.bic = options.bic;
        this.iban = options.iban;
    }
}

applyMixins(PayoutToolDetailsInternationalBankAccount, [PayoutToolDetails, InternationalBankAccount]);

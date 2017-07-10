import { LegalEntity } from './legal-entity';
import { BankAccount } from '../../bank-account';

export class RussianLegalEntity extends LegalEntity {

    constructor() {
        super();
        this.entityType = 'RussianLegalEntity';
    }

    public registeredName: string;
    public registeredNumber: string;
    public inn: string;
    public actualAddress: string;
    public postAddress: string;
    public representativePosition: string;
    public representativeFullName: string;
    public representativeDocument: string;
    public bankAccount: BankAccount;
}

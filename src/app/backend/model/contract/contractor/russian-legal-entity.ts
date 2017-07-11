import { LegalEntity } from './legal-entity';
import { BankAccount } from '../../bank-account';

export class RussianLegalEntity extends LegalEntity {

    public registeredName: string;
    public registeredNumber: string;
    public inn: string;
    public actualAddress: string;
    public postAddress: string;
    public representativePosition: string;
    public representativeFullName: string;
    public representativeDocument: string;
    public bankAccount: BankAccount;

    constructor(options: {
        registeredName: string,
        registeredNumber: string,
        inn: string,
        actualAddress: string,
        postAddress: string,
        representativePosition: string,
        representativeFullName: string,
        representativeDocument: string,
        bankAccount: BankAccount
    }) {
        super();
        this.entityType = 'RussianLegalEntity';
        this.registeredName = options.registeredName;
        this.registeredNumber = options.registeredNumber;
        this.inn = options.inn;
        this.actualAddress = options.actualAddress;
        this.postAddress = options.postAddress;
        this.representativePosition = options.representativePosition;
        this.representativeDocument = options.representativeDocument;
        this.bankAccount = options.bankAccount;
    }
}

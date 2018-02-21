import { LegalEntity } from 'koffing/backend/model/contract/contractor/legal-entity';
import { LegalEntityTypeEnum } from 'koffing/backend/model/contract/contractor/legal-entity-type-enum';
import { BankAccount } from 'koffing/backend/model/bank-account';

export class InternationalLegalEntity extends LegalEntity {
    public legalName: string;
    public registeredOffice: string;
    public tradingName?: string;
    public principalPlaceOfBusiness?: string;
    public bankAccount: BankAccount;

    constructor(options: {
        legalName: string,
        registeredOffice: string,
        tradingName?: string,
        principalPlaceOfBusiness?: string
        bankAccount: BankAccount
    }) {
        super();
        this.entityType = LegalEntityTypeEnum.InternationalLegalEntity;
        this.legalName = options.legalName;
        this.registeredOffice = options.registeredOffice;
        this.tradingName = options.tradingName;
        this.principalPlaceOfBusiness = options.principalPlaceOfBusiness;
        this.bankAccount = options.bankAccount;
    }
}

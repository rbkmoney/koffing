import { LegalEntity } from 'koffing/backend/model/contract/contractor/legal-entity';
import { LegalEntityTypeEnum } from 'koffing/backend/model/contract/contractor/legal-entity-type-enum';

export class InternationalLegalEntity extends LegalEntity {
    public legalName: string;
    public registeredOffice: string;
    public tradingName?: string;
    public principalPlaceOfBusiness?: string;

    constructor(options: {
        legalName: string,
        registeredOffice: string,
        tradingName?: string,
        principalPlaceOfBusiness?: string
    }) {
        super();
        this.entityType = LegalEntityTypeEnum.InternationalLegalEntity;
        this.legalName = options.legalName;
        this.registeredOffice = options.registeredOffice;
        this.tradingName = options.tradingName;
        this.principalPlaceOfBusiness = options.principalPlaceOfBusiness;
    }
}

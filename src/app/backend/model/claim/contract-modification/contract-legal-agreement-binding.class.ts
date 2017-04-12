import { ContractModification } from '../contract-modification.class';
import { LegalAgreement } from '../../legal-agreement.class';

export class ContractLegalAgreementBinding extends ContractModification {
    public legalAgreement: LegalAgreement;

    constructor() {
        super();
        this.contractModificationType = 'ContractLegalAgreementBinding';
    }
}

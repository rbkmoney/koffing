import { ContractModification } from './contract-modification';
import { LegalAgreement } from '../../../contract/legal-agreement';

export class ContractLegalAgreementBinding extends ContractModification {

    constructor() {
        super();
        this.contractModificationType = 'ContractLegalAgreementBinding';
    }

    public legalAgreement: LegalAgreement;
}

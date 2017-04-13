import { Contractor } from './contractor.class';
import { LegalAgreement } from './legal-agreement.class';

export class Contract {
    public id: string;
    public createdAt: string;
    public status: string;
    public validSince: string;
    public validUntil: string;
    public terminatedAt: string;
    public contractor: Contractor;
    public legalAgreement: LegalAgreement;

    constructor() {
        this.contractor = new Contractor();
        this.legalAgreement = new LegalAgreement();
    }
}

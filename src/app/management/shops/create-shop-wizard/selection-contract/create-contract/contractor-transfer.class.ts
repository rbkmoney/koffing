import { Contractor } from 'koffing/backend/model/contract/contractor.class';

export class ContractorTransfer {
    public contractor: Contractor;
    public valid: boolean;

    constructor(contractor: Contractor, valid: boolean) {
        this.contractor = contractor;
        this.valid = valid;
    }
}

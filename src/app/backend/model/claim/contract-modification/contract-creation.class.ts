import { ContractModification } from '../contract-modification.class';
import { Contractor } from '../../contract/contractor.class';

export class ContractCreation extends ContractModification {
    public contractor: Contractor;

    constructor() {
        super();
        this.contractModificationType = 'ContractCreation';
        this.contractor = new Contractor();
    }
}

import { ContractModification } from '../contract-modification.class';
import { Contractor } from '../../contractor.class';

export class ContractCreation extends ContractModification {
    public contractor: Contractor;

    constructor(contractID?: string) {
        super();
        this.contractModificationType = 'ContractCreation';
        this.contractID = contractID;
        this.contractor = new Contractor();
    }
}

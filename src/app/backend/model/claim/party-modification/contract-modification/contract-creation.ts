import { ContractModification } from './contract-modification';
import { Contractor } from '../../../contract/contractor/contractor';

export class ContractCreation extends ContractModification {

    constructor() {
        super();
        this.contractModificationType = 'ContractCreation';
    }

    public contractor: Contractor;
}

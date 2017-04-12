import { ContractModification } from '../contract-modification.class';

export class ContractTermination extends ContractModification {
    public reason: string;

    constructor() {
        super();
        this.contractModificationType = 'ContractTermination';
    }
}

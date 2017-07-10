import { ContractModification } from './contract-modification';

export class ContractTermination extends ContractModification {

    constructor() {
        super();
        this.contractModificationType = 'ContractTermination';
    }

    public reason: string;
}

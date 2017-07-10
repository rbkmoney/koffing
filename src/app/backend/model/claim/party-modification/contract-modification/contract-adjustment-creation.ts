import { ContractModification } from './contract-modification';

export class ContractAdjustmentCreation extends ContractModification {

    constructor() {
        super();
        this.contractModificationType = 'ContractAdjustmentCreation';
    }

    public adjustmentID: string;
}
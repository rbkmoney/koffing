import { PartyModification } from './party-modification.class';

export class ContractModification extends PartyModification {
    public contractID: string;
    public contractModificationType: string;

    constructor() {
        super();
        this.partyModificationType = 'ContractModification';
    }
}

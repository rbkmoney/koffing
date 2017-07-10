import { PartyModification } from '../party-modification';

export abstract class ContractModification extends PartyModification {

    constructor() {
        super();
        this.partyModificationType = 'ContractModification';
    }

    public contractID: string;
    public contractModificationType: string;
}

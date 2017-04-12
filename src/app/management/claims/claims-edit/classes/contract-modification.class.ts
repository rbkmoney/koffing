import { PartyModification } from 'koffing/backend/model/claim/party-modification.class';

export class ContractModification extends PartyModification {
    public contractModificationType: string;
    public contractID: number;
}

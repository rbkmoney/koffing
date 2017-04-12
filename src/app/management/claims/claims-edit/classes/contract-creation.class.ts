import { PartyModification } from 'koffing/backend/model/claim/party-modification.class';
import { Contract } from 'koffing/backend/model/contract.class';

export class ContractCreation extends PartyModification {
    public contract: Contract;
}

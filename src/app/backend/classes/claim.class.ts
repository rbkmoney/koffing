// todo
import { PartyModification } from 'koffing/management/claims/claims-edit/classes/party-modification.class';

export class Claim {
    public id: number;
    public changeset: PartyModification[];
    public status: string;
}

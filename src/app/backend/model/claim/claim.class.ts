import { PartyModification } from './party-modification.class';

export class Claim {
    public id: number;
    public changeset: PartyModification[];
    public status: string;
    public acceptedAt: string;
}

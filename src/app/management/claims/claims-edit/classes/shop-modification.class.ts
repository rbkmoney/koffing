import { PartyModification } from 'koffing/backend/model/claim/party-modification.class';

export class ShopModification extends PartyModification {
    public shopID: number;
    public shopModificationType: string;
}

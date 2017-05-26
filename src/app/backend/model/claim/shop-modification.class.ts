import { PartyModification } from './party-modification.class';

export class ShopModification extends PartyModification {
    public shopID: string;
    public shopModificationType: string;

    constructor() {
        super();
        this.partyModificationType = 'ShopModification';
    }
}

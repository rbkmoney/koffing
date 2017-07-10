import { PartyModification } from '../party-modification';

export abstract class ShopModification extends PartyModification {

    constructor() {
        super();
        this.partyModificationType = 'ShopModification';
    }

    public shopID: string;
    public shopModificationType: string;
}

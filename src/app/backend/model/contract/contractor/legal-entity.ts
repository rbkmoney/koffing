import { Contractor } from './contractor';

export abstract class LegalEntity extends Contractor {

    constructor() {
        super();
        this.contractorType = 'LegalEntity';
    }

    public entityType: string;
}

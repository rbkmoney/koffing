import { Claim } from './claim';

export class ClaimDenied extends Claim {

    constructor() {
        super();
        this.status = 'ClaimDenied';
    }

    public reason: string;
}
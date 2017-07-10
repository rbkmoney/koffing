import { Claim } from './claim';

export class ClaimAccepted extends Claim {

    constructor() {
        super();
        this.status = 'ClaimAccepted';
    }

    public acceptedAt: string;
}

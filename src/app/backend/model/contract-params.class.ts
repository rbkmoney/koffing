import { Contractor } from './contractor.class';
import { PayoutToolParams } from './payout-tool-params.class';

export class ContractParams {
    public contractor: Contractor;
    public payoutToolParams: PayoutToolParams;

    constructor() {
        this.contractor = new Contractor();
        this.payoutToolParams = new PayoutToolParams();
    }
}

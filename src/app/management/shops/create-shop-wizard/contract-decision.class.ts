import { Contract } from 'koffing/backend/backend.module';
import { PayoutTool } from 'koffing/backend/model/contract/payout-tool.class';

export class ContractDecision {
    public contract: Contract;
    public payoutTool: PayoutTool;

    constructor() {
        this.contract = new Contract();
        this.payoutTool = new PayoutTool();
    }
}

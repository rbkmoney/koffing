import { PayoutToolParams } from './payout-tool-params.class';

export class PayoutTool {
    public id: string;
    public params: PayoutToolParams;

    constructor() {
        this.params = new PayoutToolParams();
    }
}

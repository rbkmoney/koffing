import { PayoutToolDetails } from './payout-tool-details.class';

export class PayoutTool {
    public id: string;
    public currency: string;
    public details: PayoutToolDetails;

    constructor() {
        this.details = new PayoutToolDetails();
    }
}

import { ContractModification } from './contract-modification';
import { PayoutToolDetails } from '../../../payout-tool/payout-tool-details/payout-tool-details';

export class ContractPayoutToolCreation extends ContractModification {

    constructor() {
        super();
        this.contractModificationType = 'ContractPayoutToolCreation';
    }

    public payoutToolID: string;
    public currency: string;
    public details: PayoutToolDetails;
}

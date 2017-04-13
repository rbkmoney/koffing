import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { Contractor } from 'koffing/backend/model/contract/contractor.class';
import { ContractParams } from 'koffing/backend/classes/contract-params.class';
import { PayoutToolParams } from 'koffing/backend/model/contract/payout-tool-params.class';
import { ContractService } from 'koffing/backend/services/contract.service';
import { HttpClaimService } from 'koffing/backend/services/http-claim.service';
import { PaytoolDecision } from './paytool-decision.class';

@Injectable()
export class PaytoolDecisionService {

    constructor(
        private contractService: ContractService,
        private httpClaimService: HttpClaimService
    ) {}

    public createPayoutTool(contractID: string, payoutToolsParams: PayoutToolParams): Promise<PaytoolDecision>  {
        return new Promise((resolve) => {
            console.log('createPayoutTool');
            // this.contractService.createPayoutTool(contractID, payoutToolsParams).then((result: any) => {
            //     this.claimService.getClaimByID(result.claimID).then((claim: Claim) => {
            //         const payoutToolID = this.getPayoutToolID(contractID, claim.changeset);
            //         resolve(new PaytoolDecision(contractID, payoutToolID));
            //     });
            // });
        });
    }

    public createContract(contractor: Contractor, payoutToolsParams: PayoutToolParams): Promise<PaytoolDecision> {
        const contractParams = new ContractParams();
        contractParams.contractor = contractor;
        contractParams.payoutToolParams = payoutToolsParams;
        return new Promise((resolve) => {
            console.log('createContract');
            // this.contractService.createContract(contractParams).then((result: any) => {
            //     this.claimService.getClaimByID(result.claimID).then((claim: Claim) => {
            //             const contractID = this.getContractID(claim.changeset);
            //             const payoutToolID = this.getPayoutToolID(contractID, claim.changeset);
            //             resolve(new PaytoolDecision(contractID, payoutToolID));
            //         }
            //     );
            // });
        });
    }

    private getContractID(changeset: any[]): string {
        const contractCreationChangeset = _.filter(changeset, (item) => item.partyModificationType === 'ContractCreation');
        const sortedChangeset = _.sortBy(contractCreationChangeset, (item) => item.contract.id);
        const last = _.last(sortedChangeset);
        return last.contract.id;
    }

    private getPayoutToolID(contractID: string, changeset: any[]): string {
        const payoutChangeset = _.filter(changeset, (item) =>
        item.partyModificationType === 'ContractModification' && item.contractModificationType === 'ContractPayoutToolCreation');
        const found = _.find(payoutChangeset, (item) => item.contractID === contractID);
        return found.payoutTool.id;
    }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { ClaimService } from 'koffing/backend/claim.service';
import { Claim } from 'koffing/backend';
import { CLAIM_TYPE, CLAIM_TYPE_LABEL, CLAIM_TYPE_SORTED_ENUM } from './claim-type';

@Injectable()
export class ClaimSupportService {

    constructor(private claimService: ClaimService) { }

    public checkExistenceClaim(claimStatus: string, claimType: string): Observable<boolean> {
        return Observable.create((observer: Observer<boolean>) => {
            this.claimService.getClaims(claimStatus).subscribe((claims: Claim[]) => {
                claims.forEach((claim: Claim) => {
                    claim.changeset.forEach((partyModification: any) => {
                        if (partyModification.shopModificationType === claimType || partyModification.contractModificationType === claimType) {
                            observer.next(true);
                            observer.complete();
                        }
                    });
                });
                observer.next(false);
                observer.complete();
            });
        });
    }

    public getClaimLabel(claim: Claim): string {
        let result = 100;
        claim.changeset.forEach((partyModification: any) => {
            if (partyModification.shopModificationType === CLAIM_TYPE.ShopCreation) {
                result = result > CLAIM_TYPE_SORTED_ENUM.ShopCreation ? CLAIM_TYPE_SORTED_ENUM.ShopCreation : result;
            } else
            if (partyModification.shopModificationType === CLAIM_TYPE.ShopContractBinding) {
                result = result > CLAIM_TYPE_SORTED_ENUM.ShopContractBinding ? CLAIM_TYPE_SORTED_ENUM.ShopContractBinding : result;
            } else
            if (partyModification.contractModificationType === CLAIM_TYPE.ContractCreation) {
                result = result > CLAIM_TYPE_SORTED_ENUM.ContractCreation ? CLAIM_TYPE_SORTED_ENUM.ContractCreation : result;
            } else
            if (partyModification.contractModificationType === CLAIM_TYPE.ContractPayoutToolCreation) {
                result = result > CLAIM_TYPE_SORTED_ENUM.ContractPayoutToolCreation ? CLAIM_TYPE_SORTED_ENUM.ContractPayoutToolCreation : result;
            }
        });
        return CLAIM_TYPE_LABEL[CLAIM_TYPE_SORTED_ENUM[result]];
    }
}

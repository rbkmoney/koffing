import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ClaimService } from 'koffing/backend/claim.service';
import { Claim, ClaimStatus } from 'koffing/backend';

@Injectable()
export class ShopInfoService {

    constructor(private claimService: ClaimService) { }

    public checkExistenceClaim(shopID: string, claimType: string): Observable<boolean> {
        return this.claimService.getClaims(ClaimStatus.pending)
            .map((claims: Claim[]) =>
                !!claims.find((claim: Claim) =>
                    !!claim.changeset.find((pm: any) =>
                        pm.shopID === shopID && (pm.shopModificationType === claimType || pm.contractModificationType === claimType))));
    }
}

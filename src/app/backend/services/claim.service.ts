import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ConfigService } from './config.service';
import { Claim } from '../model/claim/claim.class';

@Injectable()
export class ClaimService {

    private claimUrl: string = `${this.config.capiUrl}/processing/claims`;

    constructor(
        private http: Http,
        private config: ConfigService
    ) { }

    public getClaims(queryParams: any): Promise<Claim[]> {
        const searchParams = new URLSearchParams();
        searchParams.set('claimStatus', queryParams.status);

        return this.http.get(this.claimUrl, {search: searchParams})
            .toPromise()
            .then((response) => response.json());
    }

    public getClaimByID(claimID: number): Promise<any> {
        return this.http.get(`${this.claimUrl}/${claimID}`)
            .toPromise()
            .then((response) => response.json());
    }

    public createClaim(request: any): Promise<any> {
        // todo request
        return this.http.post(this.claimUrl, request)
            .toPromise()
            .then((response) => response.json());
    }

    public revokeClaim(claimID: any, revokeReason: string): Promise<string> {
        return this.http.put(`${this.claimUrl}/${claimID}/revoke`, {reason: revokeReason})
            .toPromise()
            .then((response) => response.statusText);
    }
}

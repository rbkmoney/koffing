import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Claim } from '../classes/claim.class';
import { ConfigService } from './config.service';

@Injectable()
export class ClaimService {

    constructor(private http: Http, private config: ConfigService) { }

    public getClaim(): Promise<Claim> {
        return this.http.get(`${this.config.capiUrl}/processing/claims`)
            .toPromise()
            .then(response => response.json());

    }

    public revokeClaim(claimID: any, revokeDetails: any): Promise<string> {
        const url = `${this.config.capiUrl}/processing/claims/${claimID}/revoke`;
        const params = {
            reason: revokeDetails.reason
        };
        return this.http.post(url, params)
            .toPromise()
            .then(response => response.statusText);
    }
}

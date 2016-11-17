import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Claim } from './claim';
import { ConfigService } from './../../config.service';

@Injectable()
export class ClaimService {

    constructor(
        private http: Http,
        private config: ConfigService
    ) {}

    handleError(): void {
        //debugger;
    }

    getClaim(): Promise<Claim> {
        return this.http.get(`${this.config.capiUrl}/processing/claims`)
            .toPromise()
            .then(function(response) {
                return response.json() as Claim;
            })
            .catch(this.handleError)

    }

    revokeClaim(claimID: any, revokeDetails: any): Promise<string> {
        let url = `${this.config.capiUrl}/processing/claims/${claimID}/revoke`,
            params = {
                reason: revokeDetails.reason
            };

        return this.http.post(url, params)
            .toPromise()
            .then(function(response) {
                return response.statusText;
            })
            .catch(this.handleError)
    }
}
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { KoffingHttp } from './koffing-http.service';
import { ConfigService } from './config.service';
import { Claim, PartyModification } from './model';

@Injectable()
export class ClaimService {
    private endpoint = `${this.config.capiUrl}/processing/claims`;

    constructor(private http: KoffingHttp, private config: ConfigService) {}

    public getClaims(claimStatus?: string): Observable<Claim[]> {
        const search = new URLSearchParams();
        if (claimStatus) {
            search.set('claimStatus', claimStatus);
        }
        return this.http.get(this.endpoint, { search }).map(res => res.json());
    }

    public createClaim(claimChangeset: PartyModification[]): Observable<Claim> {
        return this.http.post(this.endpoint, claimChangeset).map(res => res.json());
    }

    public getClaimByID(claimID: number): Observable<Claim> {
        return this.http.get(`${this.endpoint}/${claimID}`).map(res => res.json());
    }

    public revokeClaimByID(
        claimID: number,
        claimRevision: number,
        reason: string
    ): Observable<void> {
        const search = new URLSearchParams();
        search.set('claimRevision', String(claimRevision));
        return this.http
            .put(`${this.endpoint}/${claimID}/revoke`, { reason }, { search })
            .map(res => res.json());
    }

    public updateClaimByID(
        claimID: number,
        claimRevision: number,
        claimChangeset: PartyModification[]
    ): Observable<void> {
        const search = new URLSearchParams();
        search.set('claimRevision', String(claimRevision));
        return this.http
            .post(`${this.endpoint}/${claimID}/update`, claimChangeset, { search })
            .map(res => res.json());
    }
}

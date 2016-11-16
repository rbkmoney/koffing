import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Claim } from './claim';
import { Urls } from './../../app-config/constants';

@Injectable()
export class ClaimService {

    constructor(private http: Http) {}

    handleError(): void {
        // debugger;
    }

    getClaim(): Promise<Claim> {
        return this.http.get(Urls.claims)
            .toPromise()
            .then(function(response) {
                return response.json() as Claim;
            })
            .catch(this.handleError)

    }
}
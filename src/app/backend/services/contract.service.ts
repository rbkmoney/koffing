import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ConfigService } from './config.service';
import { Contract } from '../classes/contract.class';
import { Contractor } from '../classes/contractor.class';
import { PayoutAccount } from '../classes/payout-account.class';

@Injectable()
export class ContractService {

    private contractsUrl: string = `${this.config.capiUrl}/processing/contracts`;

    constructor(private http: Http, private config: ConfigService) {}

    public getContracts(): Promise<Contract[]> {
        return this.http.get(this.contractsUrl)
            .toPromise()
            .then(response => response.json() as Contract[]);
    }

    public getContract(contractID: number): Promise<Contract> {
        return this.http.get(`${this.contractsUrl}/${contractID}`)
            .toPromise()
            .then(response => response.json() as Contract);
    }

    public createContract(contractor: Contractor): Promise<any> {
        return this.http.post(this.contractsUrl, {contractor})
            .toPromise()
            .then(response => response.json());
    }

    public createPayoutAccount(contractID: number, payoutAccount: PayoutAccount): Promise<any> {
        const params = {
            currency: payoutAccount.currency,
            tool: payoutAccount.tool
        };
        return this.http.post(`${this.contractsUrl}/${contractID}/accounts`, params)
            .toPromise()
            .then(response => response.json());
    }
}

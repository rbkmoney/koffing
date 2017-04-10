import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ConfigService } from './config.service';
import { Contract } from '../classes/contract.class';
import { PayoutTool } from '../classes/payout-tool.class';

@Injectable()
export class ContractService {

    private contractsUrl: string = `${this.config.capiUrl}/processing/contracts`;

    constructor(
        private http: Http,
        private config: ConfigService
    ) { }

    public getContracts(): Promise<Contract[]> {
        return this.http.get(this.contractsUrl)
            .toPromise()
            .then((response) => response.json());
    }

    public getContractByID(contractID: number): Promise<Contract> {
        return this.http.get(`${this.contractsUrl}/${contractID}`)
            .toPromise()
            .then((response) => response.json());
    }

    public getPayoutTools(contractID: number): Promise<PayoutTool[]> {
        return this.http.get(`${this.contractsUrl}/${contractID}/payout_tools`)
            .toPromise()
            .then((response) => response.json());
    }
}

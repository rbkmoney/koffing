import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ConfigService } from './config.service';
import { Contract } from '../model/contract/contract.class';
import { PayoutTool } from '../model/contract/payout-tool.class';

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

    public getContract(contractID: string): Promise<Contract> {
        return this.http.get(`${this.contractsUrl}/${contractID}`)
            .toPromise()
            .then((response) => response.json());
    }

    public getPayoutTools(contractID: string): Promise<PayoutTool[]> {
        return this.http.get(`${this.contractsUrl}/${contractID}/payout_tools`)
            .toPromise()
            .then((response) => response.json());
    }
}

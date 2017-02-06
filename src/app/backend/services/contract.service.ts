import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ConfigService } from './config.service';
import { Contract } from '../classes/contract.class';
import { Contractor } from '../classes/contractor.class';
import { PayoutTool } from '../classes/payout-tool.class';
import { PayoutToolParams } from '../classes/payout-tool-params.class';

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

    public createContract(request: any): Promise<any> {
        return this.http.post(this.contractsUrl, request)
            .toPromise()
            .then(response => response.json());
    }

    public getPayoutTools(contractID: number): Promise<PayoutTool[]> {
        return this.http.get(`${this.contractsUrl}/${contractID}/payout_tools`)
            .toPromise()
            .then(response => response.json() as PayoutTool[]);
    }

    public createPayoutTool(contractID: number, payoutTool: PayoutTool): Promise<any> {
        return this.http.post(`${this.contractsUrl}/${contractID}/payout_tools`, payoutTool.params)
            .toPromise()
            .then(response => response.json());
    }
}

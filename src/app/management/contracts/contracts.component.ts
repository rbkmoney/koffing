import { Component, OnInit } from '@angular/core';

import { HttpContractService } from 'koffing/backend/backend.module';
import { Contract } from 'koffing/backend/backend.module';

@Component({
    templateUrl: 'contracts.component.pug'
})
export class ContractsComponent implements OnInit {

    public contracts: Contract[] = [];
    public selectedContract: Contract;
    public isLoading: boolean = false;

    constructor(
        private httpContractService: HttpContractService
    ) { }

    public ngOnInit() {
        this.isLoading = true;
        this.httpContractService.getContracts().then((contracts: Contract[]) => {
            this.contracts = contracts;
            this.isLoading = false;
        });
    }

    public selectContract(contract: Contract) {
        if (this.selectedContract === contract) {
            this.selectedContract = new Contract();
        } else {
            this.selectedContract = contract;
        }
    }
}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ContractService } from 'koffing/backend/services/contract.service';
import { Contract } from 'koffing/backend/classes/contract.class';

@Component({
    templateUrl: 'contracts.component.pug'
})
export class ContractsComponent implements OnInit {

    @ViewChild('input')
    public input: ElementRef;

    public contracts: Contract[] = [];
    public isLoading: boolean;

    constructor(private contractService: ContractService) {}

    public ngOnInit() {
        this.isLoading = true;
        this.contractService.getContracts().then(response => {
            this.contracts = response;
            this.isLoading = false;
        });
    }

    public expandInfo(e: any) {
        // console.log(e);
        console.log(this.input);
    }
}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

import { SelectItem } from 'koffing/common/common.module';
import { Contract } from 'koffing/backend/model/contract/contract.class';
import { HttpContractService } from 'koffing/backend/backend.module';

@Component({
    selector: 'kof-select-contract',
    templateUrl: 'select-contract.component.pug'
})
export class SelectContractComponent implements OnInit {

    @Output()
    public onContractSelected = new EventEmitter();

    public selectableItems: SelectItem[] = [];
    public selectedContractID: string;
    public contracts: Contract[];
    public selectedContract: Contract;
    public isLoading: boolean = true;
    public errorHighlighted: boolean = false;

    constructor(
        private contractService: HttpContractService
    ) { }

    public ngOnInit() {
         this.contractService.getContracts().then((contracts) => {
             this.isLoading = false;
             this.contracts = contracts;
             this.selectableItems = this.prepareSelectableItems(contracts);
         });
    }

    public highlightErrors() {
        this.errorHighlighted = true;
    }

    public selectContract() {
        this.selectedContract = this.findContractByID(this.contracts, this.selectedContractID);
        this.errorHighlighted = false;
        this.onContractSelected.emit(this.selectedContract);
    }

    private prepareSelectableItems(contracts: Contract[]) {
        return _.map(contracts, (contract: Contract) => new SelectItem(String(contract.id), String(contract.id)));
    }

    private findContractByID(contracts: Contract[], contractID: string) {
        return _.find(contracts, (contract: Contract) => String(contract.id) === contractID);
    }
}

import { Component, Input, OnChanges } from '@angular/core';
import { last } from 'lodash';
import {Contract, ShopContractBinding, PayoutTool} from 'koffing/backend';
import {ContractService} from 'koffing/backend/contract.service';
import {PayoutToolService} from 'koffing/backend/payout-tool.service';

@Component({
    selector: 'kof-contract-binding-details',
    templateUrl: 'contract-binding-details.component.pug'
})
export class ContractBindingDetailsComponent implements OnChanges {

    @Input()
    public contractBindings: ShopContractBinding[];

    public contractBinding: ShopContractBinding;
    public contract: Contract;
    public payoutTool: PayoutTool;

    constructor(
        private contractService: ContractService,
        private payoutToolService: PayoutToolService
    ) { }

    public ngOnChanges() {
        this.contractBinding = last(this.contractBindings);
        this.contractService.getContractByID(this.contractBinding.contractID).subscribe((contract) => {
            this.contract = contract;
        });
        this.payoutToolService.getPayoutToolByID(this.contractBinding.contractID, this.contractBinding.payoutToolID).subscribe((payoutTool) => {
            this.payoutTool = payoutTool;
        });
    }

}

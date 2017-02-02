import { Component, Input, OnInit } from '@angular/core';

import { ContractService } from 'koffing/backend/services/contract.service';
import { PayoutTool } from 'koffing/backend/classes/payout-tool.class';

@Component({
    selector: 'kof-payout-tools',
    templateUrl: 'payout-tools.component.pug'
})
export class PayoutToolsComponent implements OnInit {

    @Input()
    public contractID: number;

    public payoutTools: PayoutTool[] = [];
    public isLoading: boolean = false;

    constructor(
        private contractService: ContractService
    ) {}

    public ngOnInit() {
        this.isLoading = true;
        this.contractService.getPayoutTools(this.contractID).then((payoutTools: PayoutTool[]) => {
            this.payoutTools = payoutTools;
            this.isLoading = false;
        });
    }
}

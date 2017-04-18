import { Component, Input, OnInit } from '@angular/core';

import { HttpContractService } from 'koffing/backend/backend.module';
import { PayoutTool } from 'koffing/backend/backend.module';

@Component({
    selector: 'kof-payout-tools',
    templateUrl: 'payout-tools.component.pug'
})
export class PayoutToolsComponent implements OnInit {

    @Input()
    public contractID: string;

    public payoutTools: PayoutTool[] = [];
    public selectedPayoutTool: PayoutTool;
    public isLoading: boolean = false;

    constructor(
        private httpContractService: HttpContractService
    ) { }

    public ngOnInit() {
        this.isLoading = true;
        this.httpContractService.getPayoutTools(this.contractID).then((payoutTools: PayoutTool[]) => {
            this.payoutTools = payoutTools;
            this.isLoading = false;
        });
    }

    public selectPayoutTool(payoutTool: PayoutTool) {
        if (this.selectedPayoutTool === payoutTool) {
            this.selectedPayoutTool = new PayoutTool();
        } else {
            this.selectedPayoutTool = payoutTool;
        }
    }
}

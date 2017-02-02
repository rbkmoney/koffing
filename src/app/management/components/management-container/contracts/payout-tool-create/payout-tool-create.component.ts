import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ContractService } from 'koffing/backend/services/contract.service';
import { PayoutTool } from 'koffing/backend/classes/payout-tool.class';
import { PayoutToolBankAccount } from 'koffing/backend/classes/payout-tool-bank-account.class';
import { BankAccount } from 'koffing/backend/classes/bank-account.class';

@Component({
    selector: 'kof-payout-tool-create',
    templateUrl: 'payout-tool-create.component.pug'
})
export class PayoutToolCreateComponent implements OnInit {

    public contractID: number = Number(this.route.snapshot.params['contractID']);
    public newPayoutTool: PayoutTool;
    public isLoading: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private contractService: ContractService
    ) {}

    public ngOnInit() {
        this.newPayoutTool = new PayoutTool();
        const payoutToolBankAccount = new PayoutToolBankAccount();
        payoutToolBankAccount.bankAccount = new BankAccount();
        this.newPayoutTool.params = payoutToolBankAccount;
    }

    public createPayoutTool(form: any) {
        if (form.valid) {
            this.isLoading = true;
            this.contractService.createPayoutTool(this.contractID, this.newPayoutTool.params).then(() => {
                this.isLoading = false;
                this.router.navigate(['/management/contracts']);
            });
        }
    }
}

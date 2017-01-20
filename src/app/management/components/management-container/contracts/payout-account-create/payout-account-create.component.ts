import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ContractService } from 'koffing/backend/services/contract.service';

@Component({
    selector: 'kof-payout-account-create',
    templateUrl: 'payout-account-create.component.pug'
})
export class PayoutAccountCreateComponent implements OnInit {

    public newPayoutAccount: any;

    private contractID: number = Number(this.route.snapshot.params['contractID']);

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private contractService: ContractService
    ) {}

    public ngOnInit() {
        this.newPayoutAccount = {};
        this.newPayoutAccount.currency = '';
        this.newPayoutAccount.tool = {};
        this.newPayoutAccount.tool.bankAccount = {};
        this.newPayoutAccount.tool.bankAccount.bankName = '';
        this.newPayoutAccount.tool.bankAccount.account = '';
        this.newPayoutAccount.tool.bankAccount.bankPostAccount = '';
        this.newPayoutAccount.tool.bankAccount.bankBik = '';
    }

    public createPayoutAccount(form: any) {
        if (form.valid) {
            this.contractService.createPayoutAccount(this.contractID, this.newPayoutAccount).then((response) => {
                this.router.navigate(['/management/contracts']);
            });
        }
    }
}

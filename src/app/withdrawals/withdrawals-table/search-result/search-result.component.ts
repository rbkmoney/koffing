import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { Withdrawal } from 'koffing/backend';
import { WithdrawalStatus } from 'koffing/withdrawals/withdrawal-status';

@Component({
    selector: 'kof-withdrawal-search-result',
    templateUrl: 'search-result.component.pug'
})
export class SearchResultComponent {
    @Input()
    public withdrawals: Observable<Withdrawal[]>;

    constructor(private router: Router) {}

    public getLabelClass(status: string) {
        return {
            'label-success': status === WithdrawalStatus.Succeeded,
            'label-danger': status === WithdrawalStatus.Failed,
            'label-warning': status === WithdrawalStatus.Pending
        };
    }

    public gotToWithdrawalDetails(withdrawalID: string) {
        this.router.navigate(['wallets', 'withdrawals', withdrawalID]);
    }
}

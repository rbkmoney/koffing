import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';

import { WithdrawalTableService } from './withdrawal-table.service';
import { SearchService } from 'koffing/backend/search.service';
import { Withdrawal } from 'koffing/backend';
import { SearchFormService } from './search-form/search-form.service';

@Component({
    selector: 'kof-wallets-withdrawal',
    templateUrl: 'withdrawals-table.component.pug',
    styleUrls: ['withdrawal-table.component.less'],
    providers: [WithdrawalTableService, SearchFormService]
})
export class WithdrawalsTableComponent implements OnInit {

    public page: number = 0;
    public limit: number = 1000;
    public withdrawals: Subject<Withdrawal[]> = new Subject();
    private continuationTokens: string[] = [];
    private searchForm: FormGroup;

    constructor(private withdrawalTableService: WithdrawalTableService,
                private searchService: SearchService,
                private searchFormService: SearchFormService) {
    }

    public ngOnInit() {
        this.searchForm = this.searchFormService.searchForm;
    }

    public reset() {
        this.continuationTokens = [];
        this.page = 0;
    }

    public onSearch() {
        this.reset();
        this.search();
    }

    private search(num: number = 0) {
        this.page += num;
        const continuationToken = this.continuationTokens[this.page];
        const request = this.withdrawalTableService.toSearchParams(this.limit, continuationToken, this.searchForm.value);
        this.searchService.searchWalletWithdrawals(request).subscribe((response) => {
            this.continuationTokens[this.page + 1] = response.continuationToken;
            console.log(response.result);
            this.withdrawals.next(response.result);
        });
    }
}

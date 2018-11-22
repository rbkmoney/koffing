import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { WalletTableItem } from './wallet-table-item';
import { Wallet } from 'koffing/backend';
import { SearchAccountResult } from './search-account-result';
import { WalletService } from 'koffing/backend/wallet.service';

@Component({
    selector: 'kof-wallet-search-result',
    templateUrl: 'search-result.component.pug',
    providers: [WalletService]
})
export class SearchResultComponent implements OnInit {

    public walletTableItems: BehaviorSubject<WalletTableItem[]> = new BehaviorSubject([]);

    @Input()
    private searchWalletsResult: BehaviorSubject<Wallet[]> = new BehaviorSubject([]);
    private searchAccountsResult: BehaviorSubject<SearchAccountResult[]> = new BehaviorSubject([]);

    constructor(private walletService: WalletService) {
    }

    public ngOnInit() {
        this.searchAccountsResult.subscribe((searchAccountResults) => {
            searchAccountResults.map((result) => {
                this.searchWalletsResult.getValue().find((wallet) => wallet.id === result.walletID);
            });
        });
        this.searchWalletsResult.subscribe((wallets) => {
            this.searchAccountsResult.next([]);
            wallets.map((wallet) => {
                this.walletService.getWalletAccount(wallet.id).subscribe((account) => {
                    this.searchAccountsResult.next([
                        ...this.searchAccountsResult.getValue(),
                        {
                            walletID: wallet.id,
                            account
                        }
                    ]);
                });
            });
        });
    }
}

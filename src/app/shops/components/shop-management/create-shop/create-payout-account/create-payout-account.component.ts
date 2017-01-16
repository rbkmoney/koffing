import { Component, OnInit } from '@angular/core';

import { BankAccount } from 'koffing/shops/shops.module';

@Component({
    selector: 'kof-create-payout-account',
    templateUrl: 'create-payout-account.component.pug'
})
export class CreatePayoutAccountComponent implements OnInit {

    public currency: string;
    public bankAccountArgs: BankAccount;

    constructor(

    ) { }

    public ngOnInit() {
        this.currency = '';
        this.bankAccountArgs = new BankAccount;
    }

    public hasError() {

    }
}

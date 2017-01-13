import { Component, OnInit } from '@angular/core';

import { BankAccount } from 'koffing/shops/shops.module';
import { RussianLegalEntity } from 'koffing/shops/shops.module';

@Component({
    selector: 'kof-select-contract',
    templateUrl: 'select-contract.component.pug'
})
export class SelectContractComponent implements OnInit {

    public bankAccountArgs: BankAccount;
    public entityArgs: RussianLegalEntity;

    constructor(

    ) { }

    public ngOnInit() {
        this.bankAccountArgs = new BankAccount;
        this.entityArgs = new RussianLegalEntity;
    }

    public hasError() {

    }
}

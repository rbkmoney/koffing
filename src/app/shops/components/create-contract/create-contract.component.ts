import { Component, OnInit } from '@angular/core';

import { BankAccount } from 'koffing/shops/shops.module';
import { RussianLegalEntity } from 'koffing/shops/shops.module';

@Component({
    selector: 'kof-create-contract',
    templateUrl: './create-contract.component.pug'
})
export class CreateContractComponent implements OnInit {

    public bankAccountArgs: BankAccount;
    public entityArgs: RussianLegalEntity;

    constructor(

    ) { }

    public ngOnInit() {

    }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CreateShopService } from 'koffing/management-2/create-shop/create-shop.service';

@Component({
    selector: 'kof-payout-tool-group',
    templateUrl: 'payout-tool-group.component.pug'
})
export class PayoutToolGroupComponent implements OnInit {

    public bankAccountGroup: FormGroup;

    constructor(private createShopService: CreateShopService) { }

    public ngOnInit() {
        this.bankAccountGroup = this.createShopService.payoutToolGroup;
    }
}

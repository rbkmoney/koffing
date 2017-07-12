import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CreateShopService } from 'koffing/management-2/create-shop/create-shop.service';

@Component({
    selector: 'kof-contract-group',
    templateUrl: 'contract-group.component.pug'
})
export class ContractGroupComponent implements OnInit {

    public contractGroup: FormGroup;

    constructor(private createShopService: CreateShopService) { }

    public ngOnInit() {
        this.contractGroup = this.createShopService.contractGroup;
    }
}

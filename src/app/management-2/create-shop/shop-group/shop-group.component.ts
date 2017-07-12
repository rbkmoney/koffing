import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CreateShopService } from 'koffing/management-2/create-shop/create-shop.service';

@Component({
    selector: 'kof-shop-group',
    templateUrl: 'shop-group.component.pug'
})
export class ShopGroupComponent implements OnInit {

    public shopGroup: FormGroup;

    constructor(private createShopService: CreateShopService) { }

    public ngOnInit() {
        this.shopGroup = this.createShopService.shopGroup;
    }
}

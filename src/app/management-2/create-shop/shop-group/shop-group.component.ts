import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ShopCreation } from 'koffing/backend/model/claim/party-modification/shop-modification/shop-creation';
import { CreateShopService } from 'koffing/management-2/create-shop/create-shop.service';

@Component({
    selector: 'kof-shop-group',
    templateUrl: 'shop-group.component.pug'
})
export class ShopGroupComponent implements OnInit {

    @Input()
    public payoutToolID: string;

    @Input()
    public contractID: string;

    @Output()
    public onStatusChange = new EventEmitter<false | ShopCreation>();

    public shopGroup: FormGroup;

    constructor(private createShopService: CreateShopService) { }

    public ngOnInit() {
        this.shopGroup = this.createShopService.prepareShopForm();
        this.shopGroup.statusChanges
            .map((status) => status === 'VALID'
                ? this.createShopService.toShopCreation(this.contractID, this.payoutToolID, this.shopGroup)
                : false)
            .subscribe((result) => this.onStatusChange.emit(result));
    }
}

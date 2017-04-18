import { Component, Output, EventEmitter, Input, ViewChild } from '@angular/core';

import { ShopTransfer } from './add-shop/shop-transfer.class';
import { AddShopComponent } from './add-shop/add-shop.component';
import { ContractDecision } from '../contract-decision.class';
import { ClaimService } from '../../../claims/claim.service';
import { ClaimCreateBroadcaster } from 'koffing/broadcaster/services/claim-create.broadcaster.service';

@Component({
    selector: 'kof-selection-shop-fields',
    templateUrl: 'selection-shop-fields.component.pug'
})
export class SelectionShopComponent {

    @Input()
    public contractDecision: ContractDecision;

    @Output()
    public onCreated = new EventEmitter();

    public isLoading = false;
    public shopTransfer: ShopTransfer;

    @ViewChild('addShopRef')
    private addShopComponent: AddShopComponent;

    constructor(
        private claimService: ClaimService,
        private claimCreateBroadcaster: ClaimCreateBroadcaster
    ) { }

    public onShopFieldsChange(shopTransfer: ShopTransfer) {
        this.shopTransfer = shopTransfer;
    }

    public createShop() {
        if (this.shopTransfer && this.shopTransfer.valid) {
            this.isLoading = true;
            this.claimService.createShop(this.shopTransfer.shop, this.contractDecision.contract, this.contractDecision.payoutTool).then(() => {
                this.claimCreateBroadcaster.fire();
                this.isLoading = false;
                this.onCreated.emit();
            });
        } else {
            this.addShopComponent.highlightErrors();
        }
    }
}

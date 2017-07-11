import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CreateShopService } from 'koffing/management-2/create-shop/create-shop.service';
import { ContractPayoutToolCreation } from 'koffing/backend/model/claim/party-modification/contract-modification/contract-payout-tool-creation';

@Component({
    selector: 'kof-payout-tool-group',
    templateUrl: 'payout-tool-group.component.pug'
})
export class PayoutToolGroupComponent implements OnInit {

    @Input()
    public contractID: string;

    @Output()
    public onStatusChange = new EventEmitter<false | ContractPayoutToolCreation>();

    public bankAccountGroup: FormGroup;

    constructor(private createShopService: CreateShopService) { }

    public ngOnInit() {
        this.bankAccountGroup = this.createShopService.prepareBankAccountForm();
        this.bankAccountGroup.statusChanges
            .map((status) => status === 'VALID'
                ? this.createShopService.toPayoutToolCreation(this.contractID, this.bankAccountGroup)
                : false)
            .subscribe((result) => this.onStatusChange.emit(result));
    }
}

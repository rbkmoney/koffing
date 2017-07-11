import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CreateShopService } from 'koffing/management-2/create-shop/create-shop.service';
import { ContractCreation } from 'koffing/backend/model/claim/party-modification/contract-modification/contract-creation';

@Component({
    selector: 'kof-contract-group',
    templateUrl: 'contract-group.component.pug'
})
export class ContractGroupComponent implements OnInit {

    @Output()
    public onStatusChange = new EventEmitter<false | ContractCreation>();

    public contractGroup: FormGroup;

    constructor(private createShopService: CreateShopService) { }

    public ngOnInit() {
        this.contractGroup = this.createShopService.prepareContractForm();
        this.contractGroup.statusChanges
            .map((status) => status === 'VALID'
                ? this.createShopService.toContractCreation(this.contractGroup)
                : false)
            .subscribe((result) => this.onStatusChange.emit(result));
    }
}

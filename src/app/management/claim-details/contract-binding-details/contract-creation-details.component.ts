import { Component, Input, OnChanges } from '@angular/core';
import { last } from 'lodash';

import { Shop, Contract, PayoutTool, PartyModification } from 'koffing/backend';
import { ShopService } from 'koffing/backend/shop.service';
import { ClaimDetailsService } from '../claim-details.service';

@Component({
    selector: 'kof-contract-creation-details',
    templateUrl: 'contract-binding-details.component.pug'
})
export class ContractCreationDetailsComponent implements OnChanges {

    @Input()
    public partyModifications: PartyModification[];

    public shop: Shop;
    public contract: Contract = new Contract();
    public payoutTool: PayoutTool = new PayoutTool();

    constructor(
        private shopService: ShopService,
        private claimDetailsService: ClaimDetailsService
    ) { }

    public ngOnChanges() {
        const contractBinding = last(this.claimDetailsService.toContractBinding(this.partyModifications));
        this.shopService.getShopByID(contractBinding.shopID).subscribe((shop) => this.shop = shop);
        const contractCreation = last(this.claimDetailsService.toContractCreations(this.partyModifications));
        this.contract.contractor = contractCreation.contractor;
        const payoutToolCreation = last(this.claimDetailsService.toContractPayoutToolCreations(this.partyModifications));
        this.payoutTool.currency = payoutToolCreation.currency;
        this.payoutTool.details = payoutToolCreation.details;
    }
}

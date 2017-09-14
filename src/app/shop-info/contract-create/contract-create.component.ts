import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { find } from 'lodash';
import * as uuid from 'uuid/v4';

import { SelectItem } from 'koffing/common/select/select-item';
import {
    Shop, Claim, Contract,
    ContractCreation,
    RussianLegalEntity,
    ShopContractBinding,
    PayoutToolBankAccount,
    ContractPayoutToolCreation,
} from 'koffing/backend';
import { ClaimService } from 'koffing/backend/claim.service';
import { ShopService } from 'koffing/backend/shop.service';
import { ContractService } from 'koffing/backend/contract.service';
import { ContractFormService2 } from 'koffing/domain/contract-form/contract-form.service';
import { PayoutToolFormService2 } from 'koffing/domain/payout-tool-form/payout-tool-form.service';
import { ContractCreateService } from './contract-create.service';

@Component({
    templateUrl: 'contract-create.component.pug',
    styleUrls: ['contract-create.component.less'],
    providers: [ContractCreateService]
})
export class ContractCreateComponent implements OnInit {

    public shop: Shop;
    public contracts: Contract[];
    public contractItems: SelectItem[];
    public selectedContract: Contract;
    public selectedContractID: string;
    public contractForm: FormGroup;
    public payoutToolForm: FormGroup;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private shopService: ShopService,
        private contractService: ContractService,
        private contractFormService: ContractFormService2,
        private payoutToolFormService: PayoutToolFormService2,
        private contractCreateService: ContractCreateService,
        private claimService: ClaimService,
    ) { }
    
    public ngOnInit() {
        this.contractForm = this.contractFormService.initForm();
        this.payoutToolForm = this.payoutToolFormService.initForm();

        const shopID = this.route.parent.snapshot.params['shopID'];
        const shopObservable = this.shopService.getShopByID(shopID);
        const contractsObservable = this.contractService.getContracts();

        Observable.zip(shopObservable, contractsObservable).subscribe((response) => {
            this.shop = response[0];
            this.contracts = response[1];
            this.contractItems = this.contractCreateService.getContractItems(this.contracts);
            this.onSelectContract(this.shop.contractID);
        });
    }

    public createContract() {
        const contractID = uuid();
        const payoutToolID = uuid();
        const payoutToolDetails = new PayoutToolBankAccount(this.payoutToolForm.value.bankAccount);

        const contractPayoutToolCreation = new ContractPayoutToolCreation(contractID, payoutToolID, payoutToolDetails);
        const contractCreation = new ContractCreation(contractID, new RussianLegalEntity(this.contractForm.value));
        const shopContractBinding = new ShopContractBinding(this.shop.id, contractID, payoutToolID);

        const changeSet = [contractCreation, contractPayoutToolCreation, shopContractBinding];
        this.claimService.createClaim(changeSet).subscribe((claim: Claim) => this.navigateToClaim(claim.id));
    }

    public updateContract() {
        const shopContractBinding = new ShopContractBinding(this.shop.id, this.selectedContract.id, this.shop.payoutToolID);
        this.claimService.createClaim([shopContractBinding]).subscribe((claim: Claim) => this.navigateToClaim(claim.id));
    }

    public onSelectContract(contractID: string) {
        this.selectedContractID = contractID;
        this.selectedContract = find(this.contracts, (contract: Contract) => contract.id === contractID);
    }

    public navigateBack() {
        this.router.navigate(['shop', this.shop.id, 'info']);
    }

    public navigateToClaim(claimID: number) {
        this.router.navigate(['claim', claimID]);
    }
}

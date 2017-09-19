import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { find } from 'lodash';

import { SelectItem } from 'koffing/common/select/select-item';
import { Claim, Shop, Contract, PayoutTool, ShopContractBinding, PartyModification } from 'koffing/backend';
import { ClaimService } from 'koffing/backend/claim.service';
import { ShopService } from 'koffing/backend/shop.service';
import { ContractService } from 'koffing/backend/contract.service';
import { PayoutToolService } from 'koffing/backend/payout-tool.service';
import { ContractCreateService } from './contract-create.service';
import { CONTRACT_CREATION_STEP } from './contract-creation-step';

@Component({
    templateUrl: 'contract-create.component.pug',
    styleUrls: ['contract-create.component.less'],
    providers: [ContractCreateService]
})
export class ContractCreateComponent implements OnInit {

    public contracts: Contract[];
    public selectedContract: Contract;
    public selectedContractID: string;
    public contractItems: SelectItem[];
    public contractForm: FormGroup;

    public payoutTools: PayoutTool[];
    public selectedPayoutTool: PayoutTool;
    public selectedPayoutToolID: string;
    public payoutToolItems: SelectItem[];
    public payoutToolForm: FormGroup;

    public shop: Shop;
    public validStep = false;
    public step = CONTRACT_CREATION_STEP;
    public currentStep = CONTRACT_CREATION_STEP.contract;
    private changeSet: PartyModification[] = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private claimService: ClaimService,
        private shopService: ShopService,
        private contractService: ContractService,
        private payoutToolService: PayoutToolService,
        private contractCreateService: ContractCreateService
    ) {
        this.contractForm = this.contractCreateService.contractForm;
        this.payoutToolForm = this.contractCreateService.payoutToolForm;
    }
    
    public ngOnInit() {
        this.route.parent.params.subscribe((params) => {
            this.loadShop(params.shopID);
        });

        this.contractCreateService.changeSetEmitter.subscribe((changeSet) => {
            if (changeSet) {
                this.validStep = true;
                this.changeSet = changeSet;
            } else {
                this.validStep = false;
            }
        });
    }

    public createAndBindContract() {
        this.contractCreateService.bindCreatedContract(this.shop.id);
        this.claimService.createClaim(this.changeSet).subscribe((claim: Claim) => this.navigateToRoot());
    }

    public bindContract() {
        const shopContractBinding = new ShopContractBinding(this.shop.id, this.selectedContract.id, this.selectedPayoutTool.id);
        this.claimService.createClaim([shopContractBinding]).subscribe((claim: Claim) => this.navigateToRoot());
    }

    public onSelectContract(contractID: string) {
        this.selectedContractID = contractID;
        this.selectedContract = find(this.contracts, (contract: Contract) => contract.id === contractID);
        if (this.selectedContract) {
            this.loadPayoutTools(this.selectedContract.id);
        }
    }

    public onSelectPayoutTool(payoutToolID: string) {
        this.selectedPayoutToolID = payoutToolID;
        this.selectedPayoutTool = find(this.payoutTools, (payoutTool: PayoutTool) => payoutTool.id === payoutToolID);
    }

    public navigateBack() {
        this.router.navigate(['shop', this.shop.id, 'info']);
    }

    public navigateToRoot() {
        this.router.navigate(['/']);
    }

    public next() {
        this.currentStep = this.currentStep + 1;
        this.validStep = this.isValid();
    }

    public prev() {
        this.currentStep = this.currentStep - 1;
        this.validStep = this.isValid();
    }

    private isValid(): boolean {
        return Boolean(this.changeSet[this.currentStep]);
    }

    private loadShop(shopID: string) {
        const shopObservable = this.shopService.getShopByID(shopID);
        const contractsObservable = this.contractService.getContracts();

        Observable.zip(shopObservable, contractsObservable).subscribe((response) => {
            this.shop = response[0];
            this.contracts = response[1];
            this.contractItems = this.contractCreateService.getContractItems(this.contracts, this.shop.contractID);
            this.onSelectContract(this.shop.contractID);
        });
    }

    private loadPayoutTools(contractID: string) {
        this.payoutToolService.getPayoutTools(contractID).subscribe((payoutTools: PayoutTool[]) => {
            const activePayoutToolID = this.getActivePayoutToolID();
            this.payoutTools = payoutTools;
            this.payoutToolItems = this.contractCreateService.getPayoutToolItems(payoutTools, activePayoutToolID);
            this.onSelectPayoutTool(activePayoutToolID || payoutTools[0].id);
        });
    }

    private getActivePayoutToolID() {
        return (this.shop.contractID === this.selectedContract.id) ? this.shop.payoutToolID : '';
    }
}

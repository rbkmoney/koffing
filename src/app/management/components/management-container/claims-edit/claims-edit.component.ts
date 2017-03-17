import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { ContractorTransfer } from 'koffing/management/components/management-container/shops/create-shop-wizard/selection-contract/create-contract/contractor-transfer.class';
import { PaytoolTransfer } from 'koffing/management/components/management-container/shops/create-shop-wizard/selection-paytool/create-paytool/paytool-transfer.class';
import { ShopDetailTransfer } from 'koffing/management/components/management-container/shops/create-shop-wizard/selection-shop-fields/add-shop/shop-detail-transfer.class';
import { ShopEditingTransfer } from 'koffing/management/components/management-container/shops/shop-editing/edit-shop/shop-editing-transfer.class';
import { ClaimsEditService } from 'koffing/management/services/claims-edit.service';
import { ClaimData } from 'koffing/management/classes/claim-data.class';

@Component({
    selector: 'kof-claims-edit',
    templateUrl: 'claims-edit.component.pug'
})
export class ClaimsEditComponent implements OnInit {

    public claimData: ClaimData;
    public isLoading: boolean = false;
    public initIncludes: boolean = false;
    private contractorReady: boolean;
    private paytoolReady: boolean;
    private shopReady: boolean;
    private formsTouched: boolean = false;

    constructor(
        private claimsEditService: ClaimsEditService,
        private router: Router
    ) { }

    public ngOnInit() {
        this.getClaimData();
    }

    public onContractorChange(value: ContractorTransfer) {
        this.formsTouched = true;
        this.contractorReady = value.valid;
        if (value.valid) {
            this.claimData.contractor = value.contractor;
        }
    }

    public onPayoutToolChange(value: PaytoolTransfer) {
        this.formsTouched = true;
        this.paytoolReady = value.valid;
        if (value.valid) {
            this.claimData.payoutToolParams = value.payoutToolParams;
        }
    }

    public onShopFieldsChange(value: ShopDetailTransfer) {
        this.formsTouched = true;
        this.shopReady = value.valid;
        if (value.valid) {
            this.claimData.shop.details = value.shopDetail;
            this.claimData.shop.categoryID = value.categoryID;
            if (this.claimData.shop.callbackHandler) {
                this.claimData.shop.callbackHandler.url = value.callbackUrl;
            }
        }
    }
    
    public onShopEditingChange(value: ShopEditingTransfer) {
        this.claimData.shopEditingParams.valid = value.valid;
        this.claimData.shopEditingParams.dirty = value.dirty;
        if (value.dirty) {
            this.formsTouched = true;
        }
        if (value.valid) {
            this.claimData.shopEditingParams.updatedShopParams = value.shopEditing;
        }
    }

    public canSubmit(): boolean {
        let canSubmit = false;
        if (this.formsTouched) {
            canSubmit = true;
            canSubmit = canSubmit && (this.claimData.contractor ? this.contractorReady : true);
            canSubmit = canSubmit && (this.claimData.payoutToolParams ? this.paytoolReady : true);
            canSubmit = canSubmit && (this.claimData.shop ? this.shopReady : true);
            if (this.claimData.shopEditingParams) {
                if (!this.claimData.contractor && !this.claimData.payoutToolParams && !this.claimData.shop) {
                    canSubmit = canSubmit && this.claimData.shopEditingParams.dirty && this.claimData.shopEditingParams.valid;
                } else {
                    canSubmit = canSubmit && this.claimData.shopEditingParams.valid;
                }
            }
        }
        return canSubmit;
    }

    public returnToManagement() {
        this.router.navigate(['/management']);
    }

    public saveChanges() {
        this.isLoading = true;
        this.claimsEditService.saveChanges(this.claimData).then(() => {
            this.isLoading = false;
            this.returnToManagement();
        });
    }

    private handleClaimData(claimData: ClaimData) {
        this.claimData = claimData;
        this.contractorReady = Boolean(claimData.contractor);
        this.paytoolReady = Boolean(claimData.payoutToolParams);
        this.shopReady = Boolean(claimData.shop);
    }

    private getClaimData() {
        this.isLoading = true;
        this.claimsEditService.getClaimData().then((claimData: ClaimData) => {
            this.handleClaimData(claimData);
            this.isLoading = false;
            _.delay(() => {
                this.initIncludes = true;
            }, 0);
        });
    }
}

import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ClaimsService } from '../../claims/claims.service';
import { PayoutTool } from 'koffing/backend/backend.module';
import { PayoutToolBankAccount } from 'koffing/backend/backend.module';
import { ClaimCreateBroadcaster } from 'koffing/broadcaster/services/claim-create.broadcaster.service';
import { PayoutToolTransfer } from 'koffing/management/shops/create-shop-wizard/selection-paytool/create-paytool/paytool-transfer.class';
import { CreatePayoutToolComponent } from 'koffing/management/shops/create-shop-wizard/selection-paytool/create-paytool/create-paytool.component';

@Component({
    selector: 'kof-payout-tool-create',
    templateUrl: 'payout-tool-create.component.pug'
})
export class PayoutToolCreateComponent {

    public contractID: string = this.route.snapshot.params['contractID'];
    public payoutToolBankAccount: PayoutToolBankAccount;
    public isPayoutToolValid: boolean = false;
    public isLoading: boolean = false;

    @ViewChild('createPaytoolRef')
    private createPayoutToolComponent: CreatePayoutToolComponent;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private claimService: ClaimsService,
        private claimCreateBroadcaster: ClaimCreateBroadcaster
    ) { }

    public payoutToolChange(value: PayoutToolTransfer) {
        this.isPayoutToolValid = value.valid;
        this.payoutToolBankAccount = value.payoutToolBankAccount;
    }

    public createPayoutTool() {
        if (this.isPayoutToolValid) {
            this.isLoading = true;
            const payoutTool = new PayoutTool();
            payoutTool.currency = 'RUB';    // todo
            payoutTool.details = this.payoutToolBankAccount;
            this.claimService.createPayoutTool(payoutTool, this.contractID).then(() => {
                this.claimCreateBroadcaster.fire();
                this.isLoading = false;
                this.navigateBack();
            });
        } else {
            this.createPayoutToolComponent.highlightErrors();
        }
    }

    public navigateBack() {
        this.router.navigate(['/management/contracts']);
    }
}

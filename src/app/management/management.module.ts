import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from 'koffing/common/common.module';
import { BackendModule } from 'koffing/backend/backend.module';
import { SuggestionsModule } from 'koffing/suggestions/suggestions.module';
import { ManagementRoutingModule } from './management-routing.module';
import { CreateShopComponent } from './create-shop/create-shop.component';
import { ContractFormComponent } from './contract-form/contract-form.component';
import { ShopGroupComponent } from './shop-form/shop-form.component';
import { BankAccountFormComponent } from './bank-account-form/bank-account-form.component';
import { ManagementComponent } from './management.component';
import { ClaimDetailsComponent } from './claim-details/claim-details.component';
import { ClaimStatusPipe } from './claim-status.pipe';
import { ClaimService } from 'koffing/backend/claim.service';
import { ContractCreationDetailsComponent } from './claim-details/contract-creation-details/contract-creation-details.component';
import { BankAccountDetailsComponent } from './claim-details/bank-account-details/bank-account-details.component';
import { ContractPayoutToolCreationDetailsComponent } from './claim-details/contract-payout-tool-creation-details/contract-payout-tool-creation-details.component';
import { ShopCreationDetailsComponent } from './claim-details/shop-creation-details/shop-creation-details.component';
import { RevokeClaimComponent } from './claim-details/revoke-claim/revoke-claim.component';

@NgModule({
    imports: [
        ManagementRoutingModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        BackendModule,
        SuggestionsModule
    ],
    declarations: [
        ManagementComponent,
        CreateShopComponent,
        ContractFormComponent,
        ShopGroupComponent,
        BankAccountFormComponent,
        ClaimStatusPipe,
        ClaimDetailsComponent,
        ContractCreationDetailsComponent,
        BankAccountDetailsComponent,
        ContractPayoutToolCreationDetailsComponent,
        ShopCreationDetailsComponent,
        RevokeClaimComponent
    ],
    providers: [ClaimService]
})
export class ManagementModule { }

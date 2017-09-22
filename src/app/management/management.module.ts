import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from 'koffing/common/common.module';
import { BackendModule } from 'koffing/backend/backend.module';
import { DomainModule } from 'koffing/domain/domain.module';
import { SuggestionsModule } from 'koffing/suggestions/suggestions.module';
import { ClaimService } from 'koffing/backend/claim.service';
import { CreateShopComponent } from './create-shop/create-shop.component';
import { ManagementComponent } from './management.component';
import { ClaimDetailsComponent } from './claim-details/claim-details.component';
import { ClaimStatusPipe } from './claim-status.pipe';
import { ContractCreationDetailsComponent } from './claim-details/contract-creation-details/contract-creation-details.component';
import { ContractPayoutToolCreationDetailsComponent } from './claim-details/contract-payout-tool-creation-details/contract-payout-tool-creation-details.component';
import { ContractBindingDetailsComponent } from './claim-details/contract-binding-details/contract-binding-details.component';
import { ShopCreationDetailsComponent } from './claim-details/shop-creation-details/shop-creation-details.component';
import { RevokeClaimComponent } from './claim-details/revoke-claim/revoke-claim.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        BackendModule,
        DomainModule,
        SuggestionsModule
    ],
    declarations: [
        ManagementComponent,
        CreateShopComponent,
        ClaimStatusPipe,
        ClaimDetailsComponent,
        ContractCreationDetailsComponent,
        ContractPayoutToolCreationDetailsComponent,
        ContractBindingDetailsComponent,
        ShopCreationDetailsComponent,
        RevokeClaimComponent
    ],
    providers: [ClaimService]
})
export class ManagementModule { }

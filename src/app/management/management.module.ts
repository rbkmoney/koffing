import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { CommonModule } from 'koffing/common/common.module';
import { BackendModule } from 'koffing/backend/backend.module';
import { SuggestionsModule } from 'koffing/suggestions/suggestions.module';
import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { ContractsComponent } from './contracts/contracts.component';
import { ContractViewComponent } from './contracts/contract-view/contract-view.component';
import { ContractCreateComponent } from './contracts/contract-create/contract-create.component';
import { PayoutToolsComponent } from './contracts/payout-tools/payout-tools.component';
import { PayoutToolViewComponent } from './contracts/payout-tool-view/payout-tool-view.component';
import { PayoutToolCreateComponent } from './contracts/payout-tool-create/payout-tool-create.component';
import { ShopsComponent } from './shops/shops.component';
import { AddShopComponent } from './shops/create-shop-wizard/selection-shop-fields/add-shop/add-shop.component';
import { EditShopComponent } from './shops/shop-editing/edit-shop/edit-shop.component';
import { ShopEditingComponent } from './shops/shop-editing/shop-editing.component';
import { SelectionShopComponent } from './shops/create-shop-wizard/selection-shop-fields/selection-shop-fields.component';
import { CreateContractComponent } from './shops/create-shop-wizard/selection-contract/create-contract/create-contract.component';
import { CreatePayoutToolComponent } from './shops/create-shop-wizard/selection-paytool/create-paytool/create-paytool.component';
import { SelectContractComponent } from './shops/create-shop-wizard/selection-contract/select-contract/select-contract.component';
import { SelectPaytoolComponent } from './shops/create-shop-wizard/selection-paytool/select-paytool/select-paytool.component';
import { CreateShopWizardComponent } from './shops/create-shop-wizard/create-shop-wizard.component';
import { SelectionContractComponent } from './shops/create-shop-wizard/selection-contract/selection-contract.component';
import { SelectionPaytoolComponent } from './shops/create-shop-wizard/selection-paytool/selection-paytool.component';
import { ShopDetailsPanelComponent } from './shops/shop-details-panel/shop-details-panel.component';
import { PaytoolDecisionService } from './shops/create-shop-wizard/selection-paytool/paytool-decision.service';

import { ClaimsComponent } from './claims/claims.component';
import { ClaimViewComponent } from './claims/claim-view.component';
import { ModificationDetailComponent } from './claims/modification-detail/modification-detail.component';

import { ShopCreationComponent } from './claims/shop-creation/shop-creation.component';
import { ShopAccountCreationComponent } from './claims/shop-account-creation/shop-account-creation.component';
import { ShopContractBindingComponent } from './claims/shop-contract-binding/shop-contract-binding.component';
import { ShopDetailsChangeComponent } from './claims/shop-details-change/shop-details-change.component';
import { ShopCategoryChangeComponent } from './claims/shop-category-change/shop-category-change.component';
import { ShopLocationChangeComponent } from './claims/shop-location-change/shop-location-change.component';
import { ShopCallbackHandlerSetupComponent } from './claims/shop-callback-handler-setup/shop-callback-handler-setup.component';
import { ShopCallbackHandlerTeardownComponent } from './claims/shop-callback-handler-teardown/shop-callback-handler-teardown.component';
import { ContractCreationComponent } from './claims/contract-creation/contract-creation.component';
import { ContractPayoutToolCreationComponent } from './claims/contract-payout-tool-creation/contract-payout-tool-creation.component';
import { ContractTerminationComponent } from './claims/contract-termination/contract-termination.component';
import { ContractAdjustmentCreationComponent } from './claims/contract-adjustment-creation/contract-adjustment-creation.component';
import { ContractLegalAgreementBindingComponent } from './claims/contract-legal-agreement-binding/contract-legal-agreement-binding.component';

@NgModule({
    imports: [
        ManagementRoutingModule,
        BrowserModule,
        FormsModule,
        CommonModule,
        BackendModule,
        SuggestionsModule
    ],
    declarations: [
        ManagementComponent,
        ShopsComponent,
        ContractsComponent,
        CreateContractComponent,
        CreatePayoutToolComponent,
        SelectContractComponent,
        SelectPaytoolComponent,
        AddShopComponent,
        EditShopComponent,
        SelectContractComponent,
        SelectPaytoolComponent,
        ContractsComponent,
        ContractViewComponent,
        ContractCreateComponent,
        PayoutToolsComponent,
        PayoutToolViewComponent,
        PayoutToolCreateComponent,
        CreatePayoutToolComponent,
        CreateShopWizardComponent,
        SelectionContractComponent,
        SelectionPaytoolComponent,
        SelectionShopComponent,
        ShopDetailsPanelComponent,
        ShopEditingComponent,

        ClaimsComponent,
        ClaimViewComponent,
        ModificationDetailComponent,

        ShopCreationComponent,
        ShopAccountCreationComponent,
        ShopContractBindingComponent,
        ShopDetailsChangeComponent,
        ShopCategoryChangeComponent,
        ShopLocationChangeComponent,
        ShopCallbackHandlerSetupComponent,
        ShopCallbackHandlerTeardownComponent,
        ContractCreationComponent,
        ContractPayoutToolCreationComponent,
        ContractTerminationComponent,
        ContractAdjustmentCreationComponent,
        ContractLegalAgreementBindingComponent,
    ],
    providers: [
        PaytoolDecisionService
    ]
})
export class ManagementModule { }

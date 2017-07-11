import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from 'koffing/common/common.module';
import { BackendModule } from 'koffing/backend/backend.module';
import { SuggestionsModule } from 'koffing/suggestions/suggestions.module';
import { ManagementRoutingModule } from './management-routing.module';
import { CreateShopComponent } from './create-shop/create-shop.component';
import { ContractGroupComponent } from './create-shop/contract-group/contract-group.component';
import { PayoutToolGroupComponent } from './create-shop/payout-tool-group/payout-tool-group.component';
import { ShopGroupComponent } from './create-shop/shop-group/shop-group.component';

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
        CreateShopComponent,
        ContractGroupComponent,
        PayoutToolGroupComponent,
        ShopGroupComponent
    ]
})
export class ManagementModule { }

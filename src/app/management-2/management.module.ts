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
        ContractFormComponent,
        ShopGroupComponent,
        BankAccountFormComponent
    ]
})
export class ManagementModule { }

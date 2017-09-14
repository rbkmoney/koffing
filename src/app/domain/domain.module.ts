import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShopDetailsComponent } from './shop-details/shop-details.component';
import { ContractDetailsComponent } from './contract-details/contract-details.component';
import { ContractorDetailsComponent } from './contractor-details/contractor-details.component';
import { BankAccountDetailsComponent } from './bank-account-details/bank-account-details.component';
import { PayoutToolDetailsComponent } from './payout-tool-details/payout-tool-details.component';
import { ContractFormComponent } from './contract-form/contract-form.component';
import { PayoutToolFormComponent } from './payout-tool-form/payout-tool-form.component';
import { BankAccountFormComponent } from './bank-account-form/bank-account-form.component';
import { ContractFormService2 } from './contract-form/contract-form.service';
import { PayoutToolFormService2 } from './payout-tool-form/payout-tool-form.service';
import { BankAccountFormService2 } from './bank-account-form/bank-account-form.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        ShopDetailsComponent,
        ContractDetailsComponent,
        ContractorDetailsComponent,
        BankAccountDetailsComponent,
        PayoutToolDetailsComponent,
        ContractFormComponent,
        PayoutToolFormComponent,
        BankAccountFormComponent,
    ],
    exports: [
        ShopDetailsComponent,
        ContractDetailsComponent,
        ContractorDetailsComponent,
        BankAccountDetailsComponent,
        PayoutToolDetailsComponent,
        ContractFormComponent,
        PayoutToolFormComponent,
        BankAccountFormComponent,
    ],
    providers: [
        ContractFormService2,
        PayoutToolFormService2,
        BankAccountFormService2,
    ]
})
export class DomainModule { }

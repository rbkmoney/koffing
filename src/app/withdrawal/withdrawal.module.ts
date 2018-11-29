import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from 'koffing/common/common.module';
import { BackendModule } from 'koffing/backend/backend.module';
import { CheckoutModule } from 'koffing/checkout/checkout.module';
import { WithdrawalComponent } from './withdrawal.component';
import { WithdrawalDetailsComponent } from './withdrawal-details/withdrawal-details.component';

@NgModule({
    imports: [
        BrowserModule,
        // FormsModule,
        // ReactiveFormsModule,
        CommonModule,
        // BackendModule,
        // CheckoutModule,
    ],
    declarations: [
        WithdrawalComponent,
        WithdrawalDetailsComponent
    ]
})
export class WithdrawalModule { }

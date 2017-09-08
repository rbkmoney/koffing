import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from 'koffing/common/common.module';
import { BackendModule } from 'koffing/backend/backend.module';
import { InvoiceComponent } from './invoice.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { InvoiceCartDetailsComponent } from './invoice-cart-details/invoice-cart-details.component';
import { PaymentsComponent } from './payments/payments.component';
import { PaymentDetailsComponent } from 'koffing/invoice/payments/payment-details/payment-details.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        BackendModule
    ],
    declarations: [
        InvoiceComponent,
        InvoiceDetailsComponent,
        InvoiceCartDetailsComponent,
        PaymentsComponent,
        PaymentDetailsComponent
    ]
})
export class InvoiceModule { }

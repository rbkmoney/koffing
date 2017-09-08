import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/primeng';
import { CommonModule } from 'koffing/common/common.module';
import { BackendModule } from 'koffing/backend/backend.module';
import { InvoicesComponent } from 'koffing/invoices/invoices.component';
import { PaginateComponent } from 'koffing/invoices/paginate/paginate.component';
import { SearchFormComponent } from 'koffing/invoices/search-form/search-form.component';
import { SearchResultComponent } from 'koffing/invoices/search-result/search-result.component';
import { PaginationPipe } from 'koffing/invoices/paginate/pagination.pipe';
import { SearchDetailsComponent } from 'koffing/invoices/search-result/search-details/search-details.component';
import { CreateInvoiceComponent } from 'koffing/invoices/create-invoice/create-invoice.component';
import { InvoicePaymentLinkComponent } from 'koffing/invoices/invoice-payment-link/invoice-payment-link.component';
import { InvoiceTemplatePaymentLinkComponent } from 'koffing/invoices/invoice-template-payment-link/invoice-template-payment-link.component';
import { CheckoutConfigFormComponent } from 'koffing/invoices/checkout-config-form/checkout-config-form.component';
import { InvoiceFormComponent } from 'koffing/invoices/invoice-form/invoice-form.component';
import { InvoiceTemplateFormComponent } from 'koffing/invoices/invoice-template-form/invoice-template-form.component';
import { PaymentInfoComponent } from 'koffing/invoices/search-result/payment-info/payment-info.component';
import { PaymentCaptureComponent } from 'koffing/invoices/search-result/payment-info/payment-capture/payment-capture.component';
import { PaymentCancelComponent } from 'koffing/invoices/search-result/payment-info/payment-cancel/payment-cancel.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        CommonModule,
        CalendarModule,
        BackendModule
    ],
    declarations: [
        InvoicesComponent,
        PaginateComponent,
        SearchFormComponent,
        SearchResultComponent,
        PaginationPipe,
        SearchDetailsComponent,
        CreateInvoiceComponent,
        InvoicePaymentLinkComponent,
        InvoiceTemplatePaymentLinkComponent,
        CheckoutConfigFormComponent,
        InvoiceFormComponent,
        InvoiceTemplateFormComponent,
        PaymentInfoComponent,
        PaymentCaptureComponent,
        PaymentCancelComponent,
    ]
})
export class InvoicesModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';

import { CalendarModule } from 'primeng/components/calendar/calendar';
import { BackendModule } from 'koffing/backend/backend.module';
import { CommonModule } from 'koffing/common/common.module';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { InvoiceTemplatesComponent } from './invoice-templates/invoice-templates.component';
import { RegistryComponent } from './registry/registry.component';
import { PaginateComponent } from './invoices/paginate/paginate.component';
import { SearchFormComponent } from './invoices/search-form/search-form.component';
import { SearchFormInvoiceTemplatesComponent } from './invoice-templates/search-form-invoice-templates/search-form-invoice-templates.component';
import { SearchResultComponent } from './invoices/search-result/search-result.component';
import { SearchResultInvoiceTemplatesComponent } from './invoice-templates/search-result-invoice-templates/search-result-invoice-templates.component';
import { PaginationPipe } from './invoices/paginate/pagination.pipe';
import { RoubleCurrencyPipe } from './rouble-currency.pipe';
import { AnalyticsComponent } from './analytics.component';
import { DateRangeSelectorComponent } from './date-range-selector/date-range-selector.component';
import { LineChartComponent } from './dashboard/line-chart/line-chart.component';
import { DoughnutChartComponent } from './dashboard/doughnut-chart/doughnut-chart.component';
import { StatisticPanelComponent } from './statistic-panel/statistic-panel.component';
import { InvoiceStatusPipe } from './invoices/invoice-statuses.pipe';
import { SearchDetailsComponent } from './invoices/search-result/search-details/search-details.component';
import { SearchDetailsInvoiceTemplateComponent } from './invoice-templates/search-result-invoice-templates/search-details-invoice-template.component';
import { PaymentInfoComponent } from './invoices/search-result/payment-info/payment-info.component';
import { PaymentStatusPipe } from './invoices/payment-statuses.pipe';
import { CreateInvoiceComponent } from './invoices/create-invoice/create-invoice.component';
import { CreateInvoiceTemplateComponent } from './invoice-templates/create-invoice-template/create-invoice-template.component';
import { UpdateInvoiceTemplateComponent } from './invoice-templates/update-invoice-template/update-invoice-template.component';
import { DeleteInvoiceTemplateComponent } from './invoice-templates/delete-invoice-template/delete-invoice-template.component';
import { ActionsComponent } from './invoices/actions/actions.component';
import { ActionsInvoiceTemplatesComponent } from './invoice-templates/actions-invoice-templates/actions-invoice-templates.component';
import { CreatePaymentLinkComponent } from './invoices/search-result/search-details/create-payment-link.component';

@NgModule({
    imports: [
        AnalyticsRoutingModule,
        BrowserModule,
        FormsModule,
        CommonModule,
        CalendarModule,
        BackendModule
    ],
    declarations: [
        DateRangeSelectorComponent,
        AnalyticsComponent,
        DashboardComponent,
        InvoicesComponent,
        InvoiceTemplatesComponent,
        RegistryComponent,
        PaginateComponent,
        SearchFormComponent,
        SearchFormInvoiceTemplatesComponent,
        SearchResultComponent,
        SearchResultInvoiceTemplatesComponent,
        BaseChartDirective,
        InvoiceStatusPipe,
        PaymentStatusPipe,
        RoubleCurrencyPipe,
        PaginationPipe,
        LineChartComponent,
        DoughnutChartComponent,
        StatisticPanelComponent,
        SearchDetailsComponent,
        SearchDetailsInvoiceTemplateComponent,
        PaymentInfoComponent,
        CreateInvoiceComponent,
        CreateInvoiceTemplateComponent,
        UpdateInvoiceTemplateComponent,
        DeleteInvoiceTemplateComponent,
        ActionsComponent,
        ActionsInvoiceTemplatesComponent,
        CreatePaymentLinkComponent
    ]
})
export class AnalyticsModule { }

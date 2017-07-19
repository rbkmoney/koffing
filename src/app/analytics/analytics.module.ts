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
import { RegistryComponent } from './registry/registry.component';
import { PaginateComponent } from './invoices/paginate/paginate.component';
import { SearchFormComponent } from './invoices/search-form/search-form.component';
import { SearchResultComponent } from './invoices/search-result/search-result.component';
import { PaginationPipe } from './invoices/paginate/pagination.pipe';
import { RoubleCurrencyPipe } from './rouble-currency.pipe';
import { AnalyticsComponent } from './analytics.component';
import { DateRangeSelectorComponent } from './date-range-selector/date-range-selector.component';
import { LineChartComponent } from './dashboard/line-chart/line-chart.component';
import { DoughnutChartComponent } from './dashboard/doughnut-chart/doughnut-chart.component';
import { StatisticPanelComponent } from './statistic-panel/statistic-panel.component';
import { InvoiceStatusPipe } from './invoices/invoice-statuses.pipe';
import { SearchDetailsComponent } from './invoices/search-result/search-details/search-details.component';
import { PaymentInfoComponent } from './invoices/search-result/payment-info/payment-info.component';
import { PaymentStatusPipe } from './invoices/payment-statuses.pipe';
import { CreateInvoiceComponent } from './invoices/create-invoice/create-invoice.component';
import { ActionsComponent } from './invoices/actions/actions.component';
import { PaymentLinkComponent } from './invoices/search-result/payment-link/payment-link.component';
import { InvoiceTemplatePaymentLinkComponent } from './invoice-template-payment-link/invoice-template-payment-link.component';

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
        RegistryComponent,
        PaginateComponent,
        SearchFormComponent,
        SearchResultComponent,
        BaseChartDirective,
        InvoiceStatusPipe,
        PaymentStatusPipe,
        RoubleCurrencyPipe,
        PaginationPipe,
        LineChartComponent,
        DoughnutChartComponent,
        StatisticPanelComponent,
        SearchDetailsComponent,
        PaymentInfoComponent,
        CreateInvoiceComponent,
        ActionsComponent,
        PaymentLinkComponent,
        InvoiceTemplatePaymentLinkComponent
    ]
})
export class AnalyticsModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FinanceComponent } from './finance/finance.component';
import { PaginateComponent } from './finance/paginate/paginate.component';
import { SearchFormComponent } from './finance/search-form/search-form.component';
import { SearchResultComponent } from './finance/search-result/search-result.component';
import { PaymentMethodComponent } from './dashboard/payment-method/payment-method.component';
import { ConversionComponent } from './dashboard/conversion/conversion.component';
import { RevenueComponent } from './dashboard/revenue/revenue.component';
import { GeolocationComponent } from './dashboard/geolocation/geolocation.component';
import { PaginationPipe } from './finance/paginate/pagination.pipe';
import { PaymentStatusPipe } from './finance/search-result/payment-statuses.pipe';
import { RoubleCurrencyPipe } from './rouble-currency.pipe';
import { CommonModule } from 'koffing/common/common.module';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { BackendModule } from 'koffing/backend/backend.module';
import { AnalyticsComponent } from 'koffing/analytics/analytics.component';
import { DateRangeSelectorComponent } from 'koffing/analytics/dashboard/date-range-selector/date-range-selector.component';

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
        FinanceComponent,
        PaginateComponent,
        SearchFormComponent,
        SearchResultComponent,
        BaseChartDirective,
        PaymentMethodComponent,
        ConversionComponent,
        RevenueComponent,
        GeolocationComponent,
        PaymentStatusPipe,
        RoubleCurrencyPipe,
        PaginationPipe
    ]
})
export class AnalyticsModule { }

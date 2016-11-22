import {NgModule} from '@angular/core';
import {SelectModule} from 'angular2-select';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';

import {AnalyticsRoutingModule} from './analytics-routing.module';

import {AnalyticsComponent} from './analytics.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FinanceComponent} from './finance/finance.component';
import {PaginateComponent} from './paginate/paginate.component';
import {SearchFormComponent} from './search-form/search-form.component';
import {SearchResultComponent} from './search-result/search-result.component';

import {PaymentStatusPipe} from './payment-statuses.pipe';
import {RoubleCurrencyPipe} from './rouble-currency.pipe';
import {PaginationPipe} from './pagination.pipe';

@NgModule({
    imports: [
        SelectModule,
        BrowserModule,
        FormsModule,
        AnalyticsRoutingModule
    ],
    declarations: [
        AnalyticsComponent,
        DashboardComponent,
        FinanceComponent,
        PaginateComponent,
        SearchFormComponent,
        SearchResultComponent,
        PaymentStatusPipe,
        RoubleCurrencyPipe,
        PaginationPipe
    ]
})
export class AnalyticsModule {
}
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
import {PaymentMethodComponent} from './dashboard/payment-method/payment-method.component.ts';
import {ConversionComponent} from './dashboard/conversion/conversion.component';
import {RevenueComponent} from './dashboard/revenue/revenue.component';
import {GeolocationComponent} from './dashboard/geolocation/geolocation.component';
import {InfoPanelComponent} from './dashboard/info-panel/info-panel.component';

import {PaymentStatusPipe} from './payment-statuses.pipe';
import {RoubleCurrencyPipe} from './rouble-currency.pipe';
import {PaginationPipe} from './pagination.pipe';

import {BaseChartDirective} from 'ng2-charts';

import {ShopService} from '../../services/shop/shop.service';
import {CustomerService} from '../../services/customers/customer.service';
import {PaymentsService} from './../../services/payments/payments.service';
import {AccountService} from './../../services/accounts/accounts.service';

@NgModule({
    imports: [
        AnalyticsRoutingModule,
        SelectModule,
        BrowserModule,
        FormsModule
    ],
    declarations: [
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
        InfoPanelComponent,
        PaymentStatusPipe,
        RoubleCurrencyPipe,
        PaginationPipe
    ],
    providers: [
        ShopService,
        CustomerService,
        PaymentsService,
        AccountService
    ]
})
export class AnalyticsModule {
}
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AnalyticsComponent} from './analytics.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FinanceComponent} from './finance/finance.component';
import {AnalyticsRoutingModule} from './analytics-routing.module';
import {ShopService} from '../../services/shop/shop.service';
import {BaseChartDirective} from 'ng2-charts';
import {PaymentMethodComponent} from './dashboard/payment-method/payment-method.component.ts';
import {CustomerService} from '../../services/customers/customer.service';
import {ConversionComponent} from './dashboard/conversion/conversion.component';
import {RevenueComponent} from './dashboard/revenue/revenue.component';
import {GeolocationComponent} from './dashboard/geolocation/geolocation.component';
import {InfoPanelComponent} from './dashboard/info-panel/info-panel.component';
import {PaymentsService} from './../../services/payments/payments.service';
import {RoubleCurrencyPipe} from './dashboard/info-panel/currency.pipe';
import {AccountService} from './../../services/accounts/accounts.service';

@NgModule({
    imports: [
        AnalyticsRoutingModule,
        BrowserModule,
        FormsModule
    ],
    declarations: [
        AnalyticsComponent,
        DashboardComponent,
        FinanceComponent,
        BaseChartDirective,
        PaymentMethodComponent,
        ConversionComponent,
        RevenueComponent,
        GeolocationComponent,
        InfoPanelComponent,
        RoubleCurrencyPipe
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
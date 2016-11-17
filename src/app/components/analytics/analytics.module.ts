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
import {DatepickerComponent} from './datepicker/datepicker.component';
import {DaterangepickerDirective} from './datepicker/daterangepicker.directive';
import {ConversionComponent} from './dashboard/conversion/conversion.component';
import {RevenueComponent} from './dashboard/revenue/revenue.component';
import {GeolocationComponent} from './dashboard/geolocation/geolocation.component';
import {InfoPanelComponent} from './dashboard/info-panel/info-panel.component';
import {PaymentsService} from './../../services/payments/payments.service';

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
        DatepickerComponent,
        DaterangepickerDirective,
        ConversionComponent,
        RevenueComponent,
        GeolocationComponent,
        InfoPanelComponent
    ],
    providers: [
        ShopService,
        CustomerService,
        PaymentsService
    ]
})
export class AnalyticsModule {
}
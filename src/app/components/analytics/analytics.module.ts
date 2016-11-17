import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AnalyticsComponent} from './analytics.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FinanceComponent} from './finance/finance.component';
import {AnalyticsRoutingModule} from './analytics-routing.module';
import {ShopService} from '../../services/shop/shop.service';
import {BaseChartDirective} from 'ng2-charts';
import {PaymentMethodComponent} from './dashboard/payment-method.component';
import {CustomerService} from '../../services/customers/customer.service';

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
        PaymentMethodComponent
    ],
    providers: [
        ShopService,
        CustomerService
    ]
})
export class AnalyticsModule {
}
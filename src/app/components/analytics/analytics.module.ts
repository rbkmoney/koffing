import { NgModule } from '@angular/core';
import { SelectModule } from 'angular2-select';
import { BrowserModule } from '@angular/platform-browser';

import { AnalyticsComponent } from './analytics.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FinanceComponent } from './finance/finance.component';

import { AnalyticsRoutingModule } from './analytics-routing.module';

@NgModule({
    imports: [
        SelectModule,
        AnalyticsRoutingModule,
        BrowserModule
    ],
    declarations: [
        AnalyticsComponent,
        DashboardComponent,
        FinanceComponent
    ]
})
export class AnalyticsModule {}
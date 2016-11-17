import {NgModule} from '@angular/core';
import {SelectModule} from 'angular2-select';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';

import {AnalyticsComponent} from './analytics.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FinanceComponent} from './finance/finance.component';
import {PaginateComponent} from './paginate/paginate.component';
import {SearchFormComponent} from './search-form/search-form.component';

import {AnalyticsRoutingModule} from './analytics-routing.module';

@NgModule({
    imports: [
        SelectModule,
        AnalyticsRoutingModule,
        BrowserModule,
        FormsModule
    ],
    declarations: [
        AnalyticsComponent,
        DashboardComponent,
        FinanceComponent,
        PaginateComponent,
        SearchFormComponent
    ]
})
export class AnalyticsModule {
}
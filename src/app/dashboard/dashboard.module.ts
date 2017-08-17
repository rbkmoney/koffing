import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LineChartComponent } from './line-chart/line-chart.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { DashboardComponent } from './dashboard.component';
import { StatisticPanelComponent } from './statistic-panel/statistic-panel.component';
import { CommonModule } from 'koffing/common/common.module';
import { BackendModule } from 'koffing/backend/backend.module';

@NgModule({
    imports: [
        DashboardRoutingModule,
        BrowserModule,
        FormsModule,
        CommonModule,
        BackendModule
    ],
    declarations: [
        DashboardComponent,
        BaseChartDirective,
        LineChartComponent,
        DoughnutChartComponent,
        StatisticPanelComponent
    ]
})
export class DashboardModule { }

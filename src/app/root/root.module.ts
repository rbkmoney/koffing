import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GrowlModule } from 'primeng/primeng';

import { RootRoutingModule } from './root-routing.module';
import { BroadcasterModule } from '../broadcaster/broadcaster.module';
import { TokenizationModule } from '../tokenization/tokenization.module';
import { WebhooksModule } from '../webhooks/webhooks.module';
import { AnalyticsModule } from '../analytics/analytics.module';
import { ManagementModule } from '../management/management.module';
import { ManagementModule as ManagementModule2 } from '../management-2/management.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopPanelComponent } from './components/top-panel/top-panel.component';
import { ContainerComponent } from './components/container/container.component';
import { HttpErrorHandleComponent } from './components/http-error-handle/http-error-handle.component';
import { AccountModule } from 'koffing/account/account.module';
import { NotificationHandleComponent } from './components/notification-handle/notification-handle.component';

@NgModule({
    imports: [
        BrowserModule,
        NoopAnimationsModule,
        GrowlModule,
        RootRoutingModule,
        BroadcasterModule,
        TokenizationModule,
        AnalyticsModule,
        ManagementModule,
        ManagementModule2,
        AccountModule,
        WebhooksModule
    ],
    declarations: [
        ContainerComponent,
        SidebarComponent,
        TopPanelComponent,
        HttpErrorHandleComponent,
        NotificationHandleComponent
    ]
})
export class RootModule { }

export * from './components/container/container.component';
export * from './components/sidebar/sidebar.component';
export * from './components/top-panel/top-panel.component';
export * from './components/http-error-handle/http-error-handle.component';

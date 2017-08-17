import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { GrowlModule } from 'primeng/primeng';

import { RootRoutingModule } from './root-routing.module';
import { BroadcasterModule } from '../broadcaster/broadcaster.module';
import { TokenizationModule } from '../tokenization/tokenization.module';
import { WebhooksModule } from '../webhooks/webhooks.module';
import { ManagementModule } from '../management/management.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopPanelComponent } from './components/top-panel/top-panel.component';
import { ContainerComponent } from './components/container/container.component';
import { HttpErrorHandleComponent } from './components/http-error-handle/http-error-handle.component';
import { AccountModule } from 'koffing/account/account.module';
import { NotificationHandleComponent } from './components/notification-handle/notification-handle.component';
import { ShopSelectorComponent } from './components/top-panel/shop-selector/shop-selector.component';
import { InvoicesModule } from 'koffing/invoices/invoices.module';
import { DocumentsModule } from 'koffing/documents/documents.module';
import { DashboardModule } from 'koffing/dashboard/dashboard.module';

@NgModule({
    imports: [
        BrowserModule,
        NoopAnimationsModule,
        GrowlModule,
        FormsModule,
        RootRoutingModule,
        BroadcasterModule,
        TokenizationModule,
        ManagementModule,
        AccountModule,
        WebhooksModule,
        InvoicesModule,
        DocumentsModule,
        DashboardModule
    ],
    declarations: [
        ContainerComponent,
        SidebarComponent,
        TopPanelComponent,
        HttpErrorHandleComponent,
        NotificationHandleComponent,
        ShopSelectorComponent
    ]
})
export class RootModule { }

export * from './components/container/container.component';
export * from './components/sidebar/sidebar.component';
export * from './components/top-panel/top-panel.component';
export * from './components/http-error-handle/http-error-handle.component';

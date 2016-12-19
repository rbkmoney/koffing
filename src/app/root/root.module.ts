import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { GrowlModule } from 'primeng/primeng';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopPanelComponent } from './components/top-panel/top-panel.component';
import { RootRoutingModule } from './root-routing.module';
import { ContainerComponent } from './components/container/container.component';
import { TokenizationModule } from '../tokenization/tokenization.module';
import { AnalyticsModule } from '../analytics/analytics.module';
import { ShopsModule } from '../shops/shops.module';
import { BroadcasterModule } from '../broadcaster/broadcaster.module';

@NgModule({
    imports: [
        RootRoutingModule,
        AnalyticsModule,
        ShopsModule,
        TokenizationModule,
        BrowserModule,
        BroadcasterModule,
        SlimLoadingBarModule.forRoot(),
        BroadcasterModule,
        GrowlModule
    ],
    declarations: [
        ContainerComponent,
        SidebarComponent,
        TopPanelComponent
    ]
})
export class RootModule { }

export * from './components/container/container.component';
export * from './components/sidebar/sidebar.component';
export * from './components/top-panel/top-panel.component';
export * from './components/http-error-handle/http-error-handle.component';

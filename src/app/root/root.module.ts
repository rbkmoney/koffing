import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopPanelComponent } from './components/top-panel/top-panel.component';
import { RootRoutingModule } from './root-routing.module';
import { ContainerComponent } from './components/container/container.component';
import { TokenizationModule } from '../tokenization/tokenization.module';
import { AnalyticsModule } from '../analytics/analytics.module';
import { ShopsModule } from '../shops/shops.module';
import { Broadcaster } from '../common/classes/broadcaster/broadcaster.class';

@NgModule({
    imports: [
        RootRoutingModule,
        AnalyticsModule,
        ShopsModule,
        TokenizationModule,
        BrowserModule
    ],
    declarations: [
        ContainerComponent,
        SidebarComponent,
        TopPanelComponent
    ],
    providers: [
        Broadcaster
    ]
})
export class RootModule { }

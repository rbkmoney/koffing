import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule } from "@angular/http";

import { RootComponent } from './components/root/root.component.ts';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopPanelComponent } from './components/top-panel/top-panel.component.ts';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { ShopsComponent } from "./components/shops/shops.component";
import { ClaimsComponent } from "./components/shops/claims/claims.component";

import { AppRoutingModule } from "./app-routing.module";

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule
    ],
    declarations: [
        RootComponent,
        SidebarComponent,
        TopPanelComponent,
        AnalyticsComponent,
        ShopsComponent,
        ClaimsComponent
    ],
    bootstrap: [ RootComponent ]
})
export class AppModule { }

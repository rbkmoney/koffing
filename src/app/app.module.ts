import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { Http, XHRBackend, RequestOptions, HttpModule } from '@angular/http';
import { RootComponent } from './components/root/root.component.ts';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopPanelComponent } from './components/top-panel/top-panel.component.ts';
import { ShopsComponent } from './components/shops/shops.component';
import { ClaimsComponent } from './components/shops/claims/claims.component';
import { ShopCreationComponent } from './components/shops/claims/shop-creation/shop-creation.component';
import { ShopModificationComponent } from './components/shops/claims/shop-modification/shop-modification.component';
import { ModificationDetailComponent } from './components/shops/claims/modification-detail/modification-detail.component';
import { AnalyticsModule } from './components/analytics/analytics.module';
import { AppRoutingModule } from './app-routing.module';
import { KeycloakHttpInterceptor } from '../keycloak/keycloak-http.interceptor';
import { ConfigService } from './config.service';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        AnalyticsModule,
        HttpModule
    ],
    declarations: [
        RootComponent,
        SidebarComponent,
        TopPanelComponent,
        ShopsComponent,
        ClaimsComponent,
        ShopCreationComponent,
        ShopModificationComponent,
        ModificationDetailComponent
    ],
    providers: [
        ConfigService,
        {
            provide: Http,
            useFactory: (
                backend: XHRBackend, defaultOptions: RequestOptions
            ) => new KeycloakHttpInterceptor(backend, defaultOptions),
            deps: [XHRBackend, RequestOptions]
        },
        {
            provide: APP_INITIALIZER,
            useFactory: (config: ConfigService) => () => config.load(),
            deps: [ConfigService],
            multi: true
        }
    ],
    bootstrap: [ RootComponent ]
})
export class AppModule { }
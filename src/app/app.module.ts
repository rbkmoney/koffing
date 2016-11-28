import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { Http, XHRBackend, RequestOptions, HttpModule } from '@angular/http';

import { RootComponent } from './components/root/root.component.ts';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopPanelComponent } from './components/top-panel/top-panel.component.ts';
import { AnalyticsModule } from './components/analytics/analytics.module';
import { AppRoutingModule } from './app-routing.module';
import { KeycloakHttpInterceptor } from '../keycloak/keycloak-http.interceptor';
import { ConfigService } from './config.service';
import { ShopsModule } from './components/shops/shops.module';
import { TokenizationModule } from './components/tokenization/tokenization.module';
import { customFormControlValueAccessor } from './components/datepicker/custom-form-control.class';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        AnalyticsModule,
        ShopsModule,
        TokenizationModule,
        HttpModule
    ],
    declarations: [
        RootComponent,
        SidebarComponent,
        TopPanelComponent
    ],
    providers: [
        customFormControlValueAccessor,
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
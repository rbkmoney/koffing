import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {AppModule} from './app/app.module';
import {KeycloakService} from "./keycloak/keycloak.service";

if (process.env.ENV === 'production') {
    enableProdMode();
}

KeycloakService.init().then(() => {
    platformBrowserDynamic().bootstrapModule(AppModule);
});

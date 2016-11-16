import {Injectable} from '@angular/core';
import {Auth} from "./Auth";

declare const Keycloak: any;

@Injectable()
export class KeycloakService {
    static auth: Auth = new Auth();

    static init(): Promise<any> {
        const keycloakAuth: any = new Keycloak('koffingKeycloakConfig.json');
        return new Promise((resolve, reject) => {
            keycloakAuth.init({onLoad: 'login-required'}).success(() => {
                this.auth.profileName = keycloakAuth.tokenParsed.name;
                this.auth.token = keycloakAuth.token;
                this.auth.logout = keycloakAuth.logout;
                this.auth.updateToken = keycloakAuth.updateToken;
                resolve();
            }).error(() => reject());
        });
    }
}
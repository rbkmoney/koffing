import { Injectable } from '@angular/core';

import { OfflineTokenService } from './offline-token.service';
import { AuthInfo } from './AuthInfo';

declare const Keycloak: any;

@Injectable()
export class KeycloakService {

    public static koffingInstance: any;

    public static init(): Promise<any> {
        return OfflineTokenService.isTokenizationFlowPath() ? this.initTokenization() : this.initKoffing();
    }

    public static logout() {
        this.koffingInstance.logout();
        OfflineTokenService.clearToken();
    }

    public static updateToken(minValidity: number) {
        return this.koffingInstance.updateToken(minValidity);
    }

    public static getAccountInfo(): AuthInfo {
        return new AuthInfo(this.koffingInstance.tokenParsed.name, this.koffingInstance.token);
    }

    public static getOfflineToken(): string {
        return OfflineTokenService.getToken();
    }

    private static initKoffing(): Promise<any> {
        const keycloakAuth: any = new Keycloak('koffingKeycloakConfig.json');
        return new Promise((resolve, reject) => {
            keycloakAuth.init({onLoad: 'login-required'}).success(() => {
                this.koffingInstance = keycloakAuth;
                resolve();
            }).error(() => reject());
        });
    }

    private static initTokenization(): Promise<any> {
        const keycloakAuth: any = new Keycloak('tokenizationKeycloakConfig.json');
        return new Promise((resolve, reject) => {
            keycloakAuth.init().success((authenticated: any) => {
                if (!authenticated) {
                    keycloakAuth.login({
                        scope: 'offline_access'
                    });
                } else {
                    OfflineTokenService.setToken(keycloakAuth.refreshToken, '/tokenization');
                    resolve();
                }
            }).error(() => reject());
        });
    }
}

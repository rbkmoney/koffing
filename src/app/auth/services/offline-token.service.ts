export class OfflineTokenService {

    public static authFlowPath: string = '/getOfflineToken';

    public static storageKey: string = 'offlineToken';

    public static isTokenizationFlowPath() {
        return window.location.pathname === this.authFlowPath;
    }

    public static setToken(token: string, redirectPath: string) {
        localStorage.setItem(this.storageKey, token);
        window.location.href = redirectPath;
    }

    public static getToken(): any {
        const token = localStorage.getItem(this.storageKey);
        return token ? token : this.goToAuthFlowPath();
    }

    public static clearToken() {
        localStorage.removeItem(this.storageKey);
    }

    private static goToAuthFlowPath() {
        window.location.href = this.authFlowPath;
    }
}

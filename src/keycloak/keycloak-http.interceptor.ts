import {Injectable} from '@angular/core';
import {Http, ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers} from '@angular/http';
import {KeycloakService} from './keycloak.service';
import {Observable} from 'rxjs';

@Injectable()
export class KeycloakHttpInterceptor extends Http {

    constructor(connectionBackend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(connectionBackend, defaultOptions);
    }

    private configureRequest(f: Function, url: string | Request, options: RequestOptionsArgs, body?: any) {
        const tokenPromise: Promise<string> = this.getToken();
        const tokenObservable: Observable<string> = Observable.fromPromise(tokenPromise);
        const tokenUpdateObservable: Observable<any> = Observable.create((observer: any) => {
            if (!options) {
                const headers = new Headers();
                options = new RequestOptions({headers: headers});
            }
            this.setHeaders(options);
            observer.next();
            observer.complete();
        });
        const requestObservable: Observable<Response> = Observable.create((observer: any) => {
            let result: any;
            if (body) {
                result = f.apply(this, [url, body, options]);
            } else {
                result = f.apply(this, [url, options]);
            }
            result.subscribe((response: any) => {
                observer.next(response);
                observer.complete();
            });
        });
        return <Observable<Response>>Observable
            .merge(tokenObservable, tokenUpdateObservable, requestObservable, 1)
            .filter((response) => response instanceof Response);
    }

    private getToken(): Promise<string> {
        const minValidity = 5;
        return new Promise<string>((resolve, reject) => {
            const token: string = KeycloakService.getAccountInfo().token;
            if (token) {
                KeycloakService.updateToken(minValidity)
                    .success(() => resolve(token))
                    .error(() => reject('Failed to refresh token'));
            }
        });
    }

    private setHeaders(options: RequestOptionsArgs) {
        options.headers.set('Authorization', 'Bearer ' + KeycloakService.getAccountInfo().token);
        options.headers.set('X-Request-ID', this.guid());
    }

    private guid(): string {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return this.configureRequest(super.request, url, options);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.configureRequest(super.get, url, options);
    }

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.configureRequest(super.post, url, options, body);
    }

    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.configureRequest(super.put, url, options, body);
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.configureRequest(super.delete, url, options);
    }

    patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.configureRequest(super.patch, url, options, body);
    }

    head(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.configureRequest(super.head, url, options);
    }

    options(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.configureRequest(super.options, url, options);
    }
}

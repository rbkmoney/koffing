import { Http, ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

export class AuthHttpInterceptor extends Http {

    private additionalHeadersPostPutPatch: any = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
    };

    private additionalHeadersGetHeadDelete: any = {
        Accept: 'application/json'
    };

    constructor(connectionBackend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(connectionBackend, defaultOptions);
    }

    public request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return this.configureRequest(super.request, url, options);
    }

    public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.configureRequest(super.get, url, options, null, this.additionalHeadersGetHeadDelete);
    }

    public post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.configureRequest(super.post, url, options, body, this.additionalHeadersPostPutPatch);
    }

    public put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.configureRequest(super.put, url, options, body, this.additionalHeadersPostPutPatch);
    }

    public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.configureRequest(super.delete, url, options, null, this.additionalHeadersGetHeadDelete);
    }

    public patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.configureRequest(super.patch, url, options, body, this.additionalHeadersPostPutPatch);
    }

    public head(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.configureRequest(super.head, url, options, null, this.additionalHeadersGetHeadDelete);
    }

    public options(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.configureRequest(super.options, url, options);
    }

    private configureRequest(
        f: Function,
        url: string | Request,
        options: RequestOptionsArgs,
        body?: any,
        additionalHeaders?: any
    ) {
        const tokenPromise: Promise<string> = this.getToken();
        const tokenObservable: Observable<string> = Observable.fromPromise(tokenPromise);
        const tokenUpdateObservable: Observable<any> = Observable.create((observer: any) => {
            if (!options) {
                const headers = new Headers();
                options = new RequestOptions({headers});
            }
            this.setHeaders(options, additionalHeaders);
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
        return <Observable<Response>> Observable
            .merge(tokenObservable, tokenUpdateObservable, requestObservable, 1)
            .filter((response) => response instanceof Response);
    }

    private getToken(): Promise<string> {
        const minValidity = 5;
        return new Promise<string>((resolve, reject) => {
            const token: string = AuthService.getAccountInfo().token;
            if (token) {
                AuthService.updateToken(minValidity)
                    .success(() => resolve(token))
                    .error(() => reject('Failed to refresh token'));
            }
        });
    }

    private setHeaders(options: RequestOptionsArgs, additionalHeaders?: any) {
        if (!options.headers) {
            options.headers = new Headers();
        }
        options.headers.set('Authorization', 'Bearer ' + AuthService.getAccountInfo().token);
        options.headers.set('X-Request-ID', this.guid());

        if (additionalHeaders) {
            for (let header in additionalHeaders) {
                if (!additionalHeaders.hasOwnProperty(header)) { continue; }
                options.headers.set(header, additionalHeaders[header]);
            }
        }
    }

    private guid(): string {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
    }
}

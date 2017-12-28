import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from './config.service';
import { ShortenerHttp } from './shortener-http.service';
import { UrlShortenerResult } from './model';

@Injectable()
export class UrlShortenerService {

    constructor(private http: ShortenerHttp,
                private config: ConfigService) {
    }

    public shorten(sourceUrl: string, expiresAt: string): Observable<UrlShortenerResult> {
        return this.http.post(this.config.urlShortenerEndpoint, {sourceUrl, expiresAt})
            .map(res => res.json());
    }
}

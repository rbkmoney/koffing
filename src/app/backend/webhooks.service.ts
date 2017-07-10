import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from './config.service';
import { Webhook } from './model/webhook';
import { CreateWebhookParams } from './requests/create-webhook-request';

@Injectable()
export class WebhooksService {

    private endpoint = `${this.config.capiUrl}/processing/webhooks`;

    constructor(
        private http: Http,
        private config: ConfigService
    ) { }

    public createWebhook(webhook: CreateWebhookParams): Observable<Webhook> {
        return this.http.post(this.endpoint, webhook).map(res => res.json());
    }

    public getWebhooks(): Observable<Webhook[]> {
        return this.http.get(this.endpoint).map(res => res.json());
    }

    public getWebhookByID(webhookID: string): Observable<Webhook> {
        return this.http.get(`${this.endpoint}/${webhookID}`).map(res => res.json());
    }

    public deleteWebhookByID(webhookID: string): Observable<Webhook> {
        return this.http.delete(`${this.endpoint}/${webhookID}`).map(res => res.json());
    }
}

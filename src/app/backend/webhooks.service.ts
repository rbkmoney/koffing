import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from 'koffing/backend/services/config.service';
import { createWebhook, Webhook } from 'koffing/backend/model/webhook.class';

@Injectable()
export class WebhooksService {

    constructor(private http: Http,
                private config: ConfigService) {
    }

    public createWebhook(webhook: createWebhook): Observable<Webhook> {
        return this.http.post(`${this.config.capiUrl}/processing/webhooks`, webhook).map(res => res.json());
    }

    public getWebhooks(): Observable<Webhook> {
        return this.http.get(`${this.config.capiUrl}/processing/webhooks`).map(res => res.json());
    }

    public getWebhookByID(webhookID: string): Observable<Webhook> {
        return this.http.get(`${this.config.capiUrl}/processing/webhooks/${webhookID}`).map(res => res.json());
    }

    public deleteWebhookByID(webhookID: string): Observable<Webhook> {
        return this.http.delete(`${this.config.capiUrl}/processing/webhooks/${webhookID}`).map(res => res.json());
    }
}

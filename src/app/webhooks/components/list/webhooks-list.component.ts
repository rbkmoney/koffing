import { Component, OnInit } from '@angular/core';

import { WebhooksService } from 'koffing/backend/backend.module';

@Component({
    selector: 'kof-offline-token',
    templateUrl: './webhooks-list.component.pug',
})
export class WebhooksListComponent implements OnInit {

    constructor(private webhooksService: WebhooksService) {}

    public webhooksList: any;

    public deleteWebhook(id: string) {
        this.webhooksService.deleteWebhookByID(id);
    }

    public ngOnInit() {
        this.webhooksList = this.webhooksService.getWebhooks();
    }
}

import { Component, OnInit } from '@angular/core';

import { WebhooksService } from 'koffing/backend/backend.module';

@Component({
    selector: 'kof-offline-token',
    templateUrl: './webhooks-list.component.pug',
})
export class WebhooksListComponent implements OnInit {

    public webhooksList: any;

    constructor(private webhooksService: WebhooksService) {}

    public deleteWebhook(id: string) {
        this.webhooksService.deleteWebhookByID(id).subscribe(() => {
            this.webhooksList = this.webhooksService.getWebhooks();
        });
    }

    public ngOnInit() {
        this.webhooksList = this.webhooksService.getWebhooks();
    }
}

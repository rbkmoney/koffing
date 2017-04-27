import { Component, OnInit } from '@angular/core';

import { WebhooksService } from 'koffing/backend/backend.module';
import { Webhook } from 'koffing/backend/model/webhook.class';
import { WebhookListItem } from '../../webhook-list-item.class';

@Component({
    selector: 'kof-webhook-list',
    templateUrl: './webhooks-list.component.pug',
})
export class WebhooksListComponent implements OnInit {

    public webhooksList: WebhookListItem[];

    constructor(private webhooksService: WebhooksService) {}

    public transformStatus(status: boolean) {
        return status ? 'Активен' : 'Неактивен';
    }

    public toggleWebhook(id: string) {
        for (let item of this.webhooksList) {
            if (item.webhook.id === id) {
                item.visible = !item.visible;
                break;
            }
        }
    }

    public ngOnInit() {
         this.webhooksService.getWebhooks().subscribe(result => {
             this.webhooksList = this.createwebhooksList(result);
        });
    }

    private createwebhooksList(webhooks: Webhook[]) {
        return webhooks.map((webhook) => {
            return {
                visible: false,
                shopName: '',
                webhook
            }
        });
    }

    public deleteWebhook(id: string) {
        this.webhooksService.deleteWebhookByID(id)
            .switchMap(() => this.webhooksService.getWebhooks())
            .subscribe((result) => {
                this.webhooksList = this.createwebhooksList(result);
             });
    }
}

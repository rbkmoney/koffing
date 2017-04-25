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

    public toggleWebhook(id: string) {
        if (this.webhooksList[0].show === undefined) {
            for (let item of this.webhooksList) {
                if (item.id === id) {
                    item.show = false;
                    break;
                }
            }
        }

        for (let item of this.webhooksList) {
            if (item.id === id) {
                item.show = !item.show;
                break;
            }
        }
    }

    public ngOnInit() {
         this.webhooksService.getWebhooks().subscribe(result => {
             this.webhooksList = result;
        });
    }
}

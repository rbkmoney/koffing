import { Component, OnInit } from '@angular/core';

import { WebhooksService, ShopService } from 'koffing/backend/backend.module';
import { Webhook } from '../../classes/webhook';

@Component({
    selector: 'kof-offline-token',
    templateUrl: './webhooks-list.component.pug',
})
export class WebhooksListComponent implements OnInit {

    public webhooksList: Array<{
        show: boolean,
        shop: string,
        webhook: Webhook
    }>;

    constructor(private webhooksService: WebhooksService,
                private shopService: ShopService) {}

    public transformStatus(status: boolean) {
        if (status) {
            return 'Активен';
        } else {
            return 'Неактивен';
        }
    }

    public toggleWebhook(id: string) {
        for (let item of this.webhooksList) {
            if (item.webhook.id === id) {
                item.show = !item.show;
                if (item.show && !item.shop) {
                    this.shopService.getShop(item.webhook.scope.shopID).then((result) => {
                       item.shop = result.details.name;
                    });
                }
                break;
            }
        }
    }

    public deleteWebhook(id: string) {
        this.webhooksService.deleteWebhookByID(id).subscribe(() => {
            this.webhooksService.getWebhooks().subscribe(result => {
                this.webhooksList = this.createwebhooksList(result);
            });
        });
    }

    public ngOnInit() {
         this.webhooksService.getWebhooks().subscribe(result => {
             this.webhooksList = this.createwebhooksList(result);
        });
    }

    private createwebhooksList(webhooks: Webhook[]) {
        const arr = [];
        for (let webhook of webhooks) {
            const item = {
                show: false,
                shop: '',
                webhook
            };
            arr.push(item);
        }
        return arr;
    }
}

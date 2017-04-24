import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WebhooksService } from 'koffing/backend/backend.module';
import { Webhook } from '../../classes/webhook';

@Component({
    selector: 'kof-offline-token',
    templateUrl: './webhooks-item.component.pug',
})
export class WebhooksItemComponent {

    public model = new Webhook(undefined, {
        topic: undefined,
        shopID: undefined,
        eventTypes: []
    });

    public topics = [
        {value: 'InvoicesTopic'}
    ];

    public eventTypes = [
        { name: 'InvoiceCreated', value: false },
        { name: 'InvoicePaid', value: false },
        { name: 'InvoiceCancelled', value: false },
        { name: 'InvoiceFulfilled', value: false },
        { name: 'PaymentStarted', value: false },
        { name: 'PaymentCaptured', value: false },
        { name: 'PaymentFailed', value: false }
    ];

    constructor(private webhooksService: WebhooksService,
                private router: Router) {}

    public toggleAll(state: boolean) {
        for (let item of this.eventTypes) {
            item.value = state;
        }
    }

    public onChangeEventTypes() {
        const arr = [];
        for (let item of this.eventTypes) {
            if (item.value) {
                arr.push(item.name);
            }
        }
        this.model.scope.eventTypes = arr;
    }

    public createWebhook() {
        this.webhooksService.createWebhook(this.model).subscribe((result) => {
            this.router.navigate(['/api/webhooks']);
        });
    }
}

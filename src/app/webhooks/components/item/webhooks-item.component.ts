import { Component, OnInit } from '@angular/core';

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

    public toggleAll(state: boolean) {
        for (let i = 0; i < this.eventTypes.length; i++) {
            this.eventTypes[i].value = state;
        }
    }

    public onChangeEventTypes() {
        const arr = [];
        for (let i = 0; i < this.eventTypes.length; i++) {
            if (this.eventTypes[i].value) {
                arr.push(this.eventTypes[i].name);
            }
        }
        this.model.scope.eventTypes = arr;
    }

    public createWebhook() {
        this.webhooksService.createWebhook(this.model);
    }

    constructor(private webhooksService: WebhooksService) {}
}

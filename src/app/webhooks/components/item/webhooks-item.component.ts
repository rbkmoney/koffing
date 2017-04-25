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
        { value: 'InvoicesTopic', label: 'InvoicesTopic' }
    ];

    public eventTypes = [
        { name: 'InvoiceCreated', value: false, description: 'Инвойс был создан.' },
        { name: 'InvoicePaid', value: false, description: 'Финансовые обязательства по инвойсу погашены, но товары или услуги плательщику ещё не предоставлены.' },
        { name: 'InvoiceCancelled', value: false, description: 'Инвойс отменён с указанием причины, все обязательства по нему недействительны.' },
        { name: 'InvoiceFulfilled', value: false, description: 'Все обязательства, как плательщика, так и мерчанта, погашены.' },
        { name: 'PaymentStarted', value: false, description: 'Платёж создан, но информационное взаимодействие ещё не было проведено.' },
        { name: 'PaymentCaptured', value: false, description: 'Провайдер по крайней мере подтвердил финансовые обязательства плательщика в рамках платежа.' },
        { name: 'PaymentFailed', value: false, description: 'При проведении платежа не удалось получить финансовые обязательства плательщика.' }
    ];

    constructor(private webhooksService: WebhooksService,
                private router: Router) {}

    public onChangeEventTypes() {
        const arr = [];
        for (let item of this.eventTypes) {
            if (item.value) {
                arr.push(item.name);
            }
        }
        this.model.scope.eventTypes = arr;
    }

    public goBack() {
        this.router.navigate(['/api/webhooks']);
    }

    public createWebhook() {
        this.webhooksService.createWebhook(this.model).subscribe(() => {
            this.router.navigate(['/api/webhooks']);
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WebhooksService, ShopService } from 'koffing/backend/backend.module';
import { CreateWebhook } from 'koffing/backend/queries/create-webhook';

@Component({
    selector: 'kof-offline-token',
    templateUrl: './webhooks-item.component.pug',
})
export class WebhooksItemComponent implements OnInit  {

    public validated: boolean = false;

    public shops: Array<{
        label: string,
        value: number
    }>;

    public model: CreateWebhook = {
        url: undefined,
        scope: {
            topic: 'InvoicesTopic',
            shopID: undefined,
            eventTypes: undefined
        }
    };

    // public topics = [
    //     { value: 'InvoicesTopic', label: 'InvoicesTopic' }
    // ];

    public eventTypes = [
        { name: 'InvoiceCreated', value: false, description: 'создан новый инвойс' },
        { name: 'InvoicePaid', value: false, description: 'инвойс перешел в состояние "Оплачен"' },
        { name: 'InvoiceCancelled', value: false, description: 'инвойс отменен по истечению срока давности' },
        { name: 'InvoiceFulfilled', value: false, description: 'инвойс успешно погашен' },
        { name: 'PaymentStarted', value: false, description: 'создан платеж' },
        { name: 'PaymentCaptured', value: false, description: 'платеж успешно завершен' },
        { name: 'PaymentFailed', value: false, description: 'при проведении платежа возникла ошибка' }
    ];

    constructor(private webhooksService: WebhooksService,
                private router: Router,
                private shopService: ShopService) {}

    public onChangeShop(value: any) {
        this.model.scope.shopID = parseInt(value, 10);
    }

    public onChangeEventTypes() {
        const arr = [];
        for (let item of this.eventTypes) {
            if (item.value) {
                arr.push(item.name);
            }
        }
        this.model.scope.eventTypes = arr;
        this.validateForm();
    }

    public goBack() {
        this.router.navigate(['/api/webhooks']);
    }

    public createWebhook() {
        this.webhooksService.createWebhook(this.model).subscribe(() => {
            this.router.navigate(['/api/webhooks']);
        });
    }

    public validateForm() {
        const model = this.model;
        this.validated = !!(model.url && model.scope.shopID && model.scope.topic && model.scope.eventTypes && model.scope.eventTypes.length > 0);
    }

    public ngOnInit() {
        this.shopService.getShops()
            .then((result) => {
            const arr = [];
                for (let item of result) {
                    arr.push({
                        label: item.details.name,
                        value: item.id
                    });
                }
            this.shops = arr;
            });
    }
}

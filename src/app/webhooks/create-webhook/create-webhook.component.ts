import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { WebhooksService } from 'koffing/backend/webhooks.service';
import { WebhookParams } from 'koffing/backend/requests/webhook-params';

@Component({
    selector: 'kof-webhook-item',
    templateUrl: 'create-webhook.component.pug',
})
export class CreateWebhookComponent implements OnInit  {

    public valid: boolean = false;

    public model: WebhookParams = {
        url: undefined,
        scope: {
            topic: 'InvoicesTopic',
            shopID: undefined,
            eventTypes: undefined
        }
    };

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
                private route: ActivatedRoute) {}

    public ngOnInit() {
        this.route.parent.params.subscribe((params) => {
            this.model.scope.shopID = params['shopID'];
        });
    }

    public onChangeEventTypes() {
        this.model.scope.eventTypes = [];
        this.model.scope.eventTypes = this.eventTypes.filter((item) => {
            if (item.value) {
                return item;
            }
        })
        .map((type) => type.name);
        this.validateForm();
    }

    public goBack() {
        this.router.navigate(['shop', this.model.scope.shopID, 'webhooks']);
    }

    public createWebhook() {
        this.webhooksService.createWebhook(this.model).subscribe(() => {
            this.goBack();
        });
    }

    public validateForm() {
        const model = this.model;
        this.valid = !!(model.url && model.scope.shopID && model.scope.topic && model.scope.eventTypes && model.scope.eventTypes.length > 0);
    }
}

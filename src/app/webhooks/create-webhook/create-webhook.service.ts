import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { forEach, mapValues } from 'lodash';

import { EventTypePresent } from '../create-webhook/event-type-present';
import { WebhooksService } from 'koffing/backend/webhooks.service';
import { WebhookParams } from 'koffing/backend/requests/webhook-params';
import { Webhook } from 'koffing/backend/model/webhook';
import { TopicItem } from 'koffing/webhooks/create-webhook/topic-item';

@Injectable()
export class CreateWebhookService {

    public createWebhookGroup: FormGroup;

    public invoiceEventTypes: EventTypePresent[];

    public customerEventTypes: EventTypePresent[];

    public topicItems: TopicItem[] = [
        {
            value: 'InvoicesTopic',
            label: 'Invoice events'
        },
        {
            value: 'CustomersTopic',
            label: 'Customers events'
        }
    ];

    private eventTypes: EventTypePresent[] = [
        new EventTypePresent('InvoiceCreated', 'создан новый инвойс', 'InvoicesTopic'),
        new EventTypePresent('InvoicePaid', 'инвойс перешел в состояние "Оплачен"', 'InvoicesTopic'),
        new EventTypePresent('InvoiceCancelled', 'инвойс отменен по истечению срока давности', 'InvoicesTopic'),
        new EventTypePresent('InvoiceFulfilled', 'инвойс успешно погашен', 'InvoicesTopic'),
        new EventTypePresent('PaymentStarted', 'создан платеж', 'InvoicesTopic'),
        new EventTypePresent('PaymentProcessed', 'платеж в обработке', 'InvoicesTopic'),
        new EventTypePresent('PaymentCaptured', 'платеж успешно завершен', 'InvoicesTopic'),
        new EventTypePresent('PaymentCancelled', 'платеж успешно отменен', 'InvoicesTopic'),
        new EventTypePresent('PaymentRefunded', 'платеж успешно возвращен', 'InvoicesTopic'),
        new EventTypePresent('PaymentFailed', 'при проведении платежа возникла ошибка', 'InvoicesTopic'),
        new EventTypePresent('CustomerCreated', 'плательщик создан', 'CustomersTopic'),
        new EventTypePresent('CustomerDeleted', 'плательщик удален', 'CustomersTopic'),
        new EventTypePresent('CustomerReady', 'плательщик готов', 'CustomersTopic'),
        new EventTypePresent('CustomerBindingStarted', 'привязка к плательщику запущена', 'CustomersTopic'),
        new EventTypePresent('CustomerBindingSucceeded', 'привязка к плательщику успешно завершена', 'CustomersTopic'),
        new EventTypePresent('CustomerBindingFailed', 'привязка к плательщику завершена с неудачей', 'CustomersTopic')
    ];

    constructor(private fb: FormBuilder,
                private webhooksService: WebhooksService) {
        this.createWebhookGroup = this.prepareForm();
        this.createWebhookGroup.controls.eventTypes.setValidators(this.eventTypesValidator);
        this.invoiceEventTypes = this.eventTypes.filter((type) => type.topic === 'InvoicesTopic');
        this.customerEventTypes = this.eventTypes.filter((type) => type.topic === 'CustomersTopic');
    }

    public createWebhook(shopID: string): Observable<Webhook> {
        if (this.createWebhookGroup.valid && shopID) {
            const params = this.toWebhookParams(shopID, this.createWebhookGroup.controls);
            return this.webhooksService.createWebhook(params);
        } else {
            return Observable.throw('Webhook form group is not valid or shopID is null');
        }
    }

    public clearSelectedTypes() {
        const eventTypes = this.createWebhookGroup.controls.eventTypes;
        eventTypes.setValue(mapValues(eventTypes.value, () => false));
    }

    private toWebhookParams(shopID: string, controls: any): WebhookParams {
        const eventTypes: string[] = [];
        forEach(controls.eventTypes.value, (checked: boolean, eventTypeName: string) => {
            if (checked) {
                eventTypes.push(eventTypeName);
            }
        });
        return {
            url: controls.url.value,
            scope: {
                topic: controls.topic.value,
                shopID,
                eventTypes
            }
        };
    }

    private prepareForm(): FormGroup {
        return this.fb.group({
            url: ['', Validators.required],
            eventTypes: this.fb.group(this.prepareEventTypesGroup(this.eventTypes)),
            topic: 'InvoicesTopic'
        });
    }

    private prepareEventTypesGroup(eventTypes: EventTypePresent[]): FormGroup {
        const controls = {};
        eventTypes.forEach((eventTypePresent) => {
            controls[eventTypePresent.name] = [false];
        });
        return controls as FormGroup;
    }

    private eventTypesValidator(control: FormControl): { [key: string]: any } {
        const valid = Object.values(control.value).some((value: any) => value === true);
        return valid ? null : {eventType: 'need some event type checked'};
    }
}

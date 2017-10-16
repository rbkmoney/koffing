import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { forEach } from 'lodash';

import { EventTypePresent } from '../create-webhook/event-type-present';
import { WebhooksService } from 'koffing/backend/webhooks.service';
import { WebhookParams } from 'koffing/backend/requests/webhook-params';
import { Webhook } from 'koffing/backend/model/webhook';
import { TopicItem } from 'koffing/webhooks/create-webhook/topic-item';

@Injectable()
export class CreateWebhookService {

    public createWebhookGroup: FormGroup;

    public eventTypes: EventTypePresent[] = [
        new EventTypePresent('InvoiceCreated', 'создан новый инвойс'),
        new EventTypePresent('InvoicePaid', 'инвойс перешел в состояние "Оплачен"'),
        new EventTypePresent('InvoiceCancelled', 'инвойс отменен по истечению срока давности'),
        new EventTypePresent('InvoiceFulfilled', 'инвойс успешно погашен'),
        new EventTypePresent('PaymentStarted', 'создан платеж'),
        new EventTypePresent('PaymentProcessed', 'платеж в обработке'),
        new EventTypePresent('PaymentCaptured', 'платеж успешно завершен'),
        new EventTypePresent('PaymentCancelled', 'платеж успешно отменен'),
        new EventTypePresent('PaymentRefunded', 'платеж успешно возвращен'),
        new EventTypePresent('PaymentFailed', 'при проведении платежа возникла ошибка')
    ];

    public customerEventTypes: EventTypePresent[] = [
        new EventTypePresent('CustomerCreated', 'плательщик создан'),
        new EventTypePresent('CustomerDeleted', 'плательщик удален'),
        new EventTypePresent('CustomerReady', 'плательщик готов'),
        new EventTypePresent('CustomerBindingStarted', 'привязка к плательщику запущена'),
        new EventTypePresent('CustomerBindingSucceeded', 'привязка к плательщику успешно завершена'),
        new EventTypePresent('CustomerBindingFailed', 'привязка к плательщику завершена с неудачей')
    ];

    constructor(private fb: FormBuilder,
                private webhooksService: WebhooksService) {
        this.createWebhookGroup = this.prepareForm();
        this.createWebhookGroup.controls.eventTypes.setValidators(this.eventTypesValidator);
        this.createWebhookGroup.controls.customerEventTypes.setValidators(this.eventTypesValidator);
    }

    public createWebhook(shopID: string): Observable<Webhook> {
        if (this.createWebhookGroup.valid && shopID) {
            const params = this.toWebhookParams(shopID, this.createWebhookGroup.controls);
            return this.webhooksService.createWebhook(params);
        } else {
            return Observable.throw('Webhook form group is not valid or shopID is null');
        }
    }

    public getTopicItems(): TopicItem[] {
        return [
            {
                value: 'InvoicesTopic',
                label: 'Invoice events'
            },
            {
                value: 'CustomersTopic',
                label: 'Customers events'
            }
        ];
    }

    public changeTopic(topicName: string) {
        // if (topicName === 'InvoicesTopic') {
        //     this.createWebhookGroup.controls.eventTypes.setValidators(this.eventTypesValidator);
        //     this.createWebhookGroup.controls.customerEventTypes.setValidators(this.eventTypesValidator);
        // } else {
        //     this.createWebhookGroup.controls.eventTypes.setValidators([]);
        //     this.createWebhookGroup.controls.customerEventTypes.setValidators(this.eventTypesValidator);
        // }
        // this.createWebhookGroup.controls.eventTypes.updateValueAndValidity();
        // this.createWebhookGroup.controls.customerEventTypes.updateValueAndValidity();
    }

    private toWebhookParams(shopID: string, controls: any): WebhookParams {
        const selectedTypes = controls.topic.value === 'InvoicesTopic'
            ? controls.eventTypes.value
            : controls.customerEventTypes.value;
        const eventTypes: string[] = [];
        forEach(selectedTypes, (checked: boolean, eventTypeName: string) => {
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
            customerEventTypes: this.fb.group(this.prepareEventTypesGroup(this.customerEventTypes)),
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
        //control.parent.controls
        console.log(control);
        const valid = Object.values(control.value).some((value: any) => value === true);
        return valid ? null : {eventType: 'need some event type checked'};
    }
}

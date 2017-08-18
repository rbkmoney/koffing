import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { WebhookComponent } from './webhook.component';
import { WebhooksListDetailsComponent } from './webhook-details/webhook-details.component';
import { WebhooksItemComponent } from './webhook-item/webhooks-item.component';
import { CommonModule } from 'koffing/common/common.module';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule
    ],
    declarations: [
        WebhookComponent,
        WebhooksListDetailsComponent,
        WebhooksItemComponent
    ]
})
export class WebhooksModule { }

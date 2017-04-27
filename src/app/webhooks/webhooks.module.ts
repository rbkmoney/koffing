import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { WebhooksRoutingModule } from './webhooks-routing.module';
import { WebhooksListComponent } from 'koffing/webhooks/components/list/webhooks-list.component';
import { WebhooksListDetailsComponent } from 'koffing/webhooks/components/list/webhooks-list-details.component';
import { WebhooksItemComponent } from 'koffing/webhooks/components/item/webhooks-item.component';
import { CommonModule } from 'koffing/common/common.module';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        WebhooksRoutingModule,
        CommonModule
    ],
    declarations: [
        WebhooksListComponent,
        WebhooksListDetailsComponent,
        WebhooksItemComponent
    ]
})
export class WebhooksModule { }

export * from './components/list/webhooks-list.component';
export * from './components/item/webhooks-item.component';

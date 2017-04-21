import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { WebhooksRoutingModule } from './webhooks-routing.module';
import { WebhooksListComponent } from 'koffing/webhooks/components/list/webhooks-list.component';
import { WebhooksItemComponent } from 'koffing/webhooks/components/item/webhooks-item.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        WebhooksRoutingModule
    ],
    declarations: [
        WebhooksListComponent,
        WebhooksItemComponent
    ]
})
export class WebhooksModule { }

export * from './components/list/webhooks-list.component';
export * from './components/item/webhooks-item.component';

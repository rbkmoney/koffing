import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WebhooksListComponent } from 'koffing/webhooks/components/list/webhooks-list.component';
import { WebhooksItemComponent } from 'koffing/webhooks/components/item/webhooks-item.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'api/webhooks',
                component: WebhooksListComponent
            },
            {
                path: 'api/webhook/new',
                component: WebhooksItemComponent
            },
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class WebhooksRoutingModule { }

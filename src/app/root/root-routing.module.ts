import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InvoicesComponent } from 'koffing/invoices/invoices.component';
import { RegistryComponent } from 'koffing/documents/registry/registry.component';
import { DashboardComponent } from 'koffing/dashboard/dashboard.component';
import { ShopComponent } from 'koffing/root/components/shop/shop.component';
import { WebhookComponent } from 'koffing/webhooks/webhook.component';
import { TokenComponent } from 'koffing/tokenization/components/token/token.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            // {
            //     path: '',
            //     redirectTo: '/analytics',
            //     pathMatch: 'full'
            // },
            {
                path: 'shop/:shopID',
                component: ShopComponent,
                children: [
                    {
                        path: 'invoices',
                        component: InvoicesComponent
                    },
                    {
                        path: 'analytics',
                        component: DashboardComponent
                    },
                    {
                        path: 'documents/registry',
                        component: RegistryComponent
                    },
                    {
                        path: 'webhooks',
                        component: WebhookComponent
                    },
                    {
                        path: 'key',
                        component: TokenComponent
                    }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class RootRoutingModule { }

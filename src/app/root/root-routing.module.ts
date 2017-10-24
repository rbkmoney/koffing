import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InvoicesComponent } from 'koffing/invoices/invoices.component';
import { RegistryComponent } from 'koffing/documents/registry/registry.component';
import { WebhooksComponent } from 'koffing/webhooks/webhooks.component';
import { TokenComponent } from 'koffing/tokenization/components/token/token.component';
import { AnalyticsComponent } from 'koffing/analytics/analytics.component';
import { PayoutsComponent } from 'koffing/payouts/payouts.component';
import { ManagementComponent } from 'koffing/management/management.component';
import { LandingContainerComponent } from './components/landing-container/landing-container.component';
import { ShopContainerComponent } from './components/shop-container/shop-container.component';
import { CreateShopComponent } from 'koffing/management/create-shop/create-shop.component';
import { ClaimDetailsComponent } from 'koffing/management/claim-details/claim-details.component';
import { AccountComponent } from 'koffing/account/account.component';
import { CreateWebhookComponent } from 'koffing/webhooks/create-webhook/create-webhook.component';
import { InvoiceComponent } from 'koffing/invoice/invoice.component';
import { ShopInfoComponent } from 'koffing/shop-info/shop-info.component';
import { ContractManageComponent } from 'koffing/shop-info/contract-manage/contract-manage.component';
import { ActsComponent } from 'koffing/documents/acts/acts.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: '/',
                pathMatch: 'full'
            },
            {
                path: '',
                component: LandingContainerComponent,
                children: [
                    {
                        path: '',
                        component: ManagementComponent
                    },
                    {
                        path: 'shop/create',
                        component: CreateShopComponent
                    },
                    {
                        path: 'claim/:claimID',
                        component: ClaimDetailsComponent
                    },
                    {
                        path: 'account/:path',
                        component: AccountComponent
                    }
                ]
            },
            {
                path: 'shop/:shopID',
                component: ShopContainerComponent,
                children: [
                    {
                        path: 'invoices',
                        component: InvoicesComponent
                    },
                    {
                        path: 'invoice/:invoiceID',
                        component: InvoiceComponent
                    },
                    {
                        path: 'analytics',
                        component: AnalyticsComponent
                    },
                    {
                        path: 'payouts',
                        component: PayoutsComponent
                    },
                    {
                        path: 'info',
                        component: ShopInfoComponent
                    },
                    {
                        path: 'contract',
                        component: ContractManageComponent
                    },
                    {
                        path: 'documents/acts',
                        component: ActsComponent
                    },
                    {
                        path: 'documents/registry',
                        component: RegistryComponent
                    },
                    {
                        path: 'webhooks',
                        component: WebhooksComponent
                    },
                    {
                        path: 'webhook/create',
                        component: CreateWebhookComponent
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

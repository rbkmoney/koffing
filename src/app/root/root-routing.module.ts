import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InvoicesComponent } from 'koffing/invoices/invoices.component';
import { RegistryComponent } from 'koffing/documents/registry/registry.component';
import { DashboardComponent } from 'koffing/dashboard/dashboard.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: '/analytics',
                pathMatch: 'full'
            },
            {
                path: 'shop/:shopID/invoices',
                component: InvoicesComponent
            },
            {
                path: 'shop/:shopID/analytics',
                component: DashboardComponent
            },
            {
                path: 'shop/:shopID/documents/registry',
                component: RegistryComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class RootRoutingModule { }

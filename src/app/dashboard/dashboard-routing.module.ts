import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from 'koffing/dashboard/dashboard.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'analytics',
                component: DashboardComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class DashboardRoutingModule { }

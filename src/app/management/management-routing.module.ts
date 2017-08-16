import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CreateShopComponent } from './create-shop/create-shop.component';
import { ClaimDetailsComponent } from './claim-details/claim-details.component';
import { ManagementComponent } from './management.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'management',
                component: ManagementComponent
            },
            {
                path: 'management/shop/create',
                component: CreateShopComponent
            },
            {
                path: 'management/claim/:claimID',
                component: ClaimDetailsComponent
            }
        ])
    ]
})
export class ManagementRoutingModule {}

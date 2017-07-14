import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CreateShopComponent } from 'koffing/management-2/create-shop/create-shop.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'management/shop/create',
                component: CreateShopComponent
            }
        ])
    ]
})
export class ManagementRoutingModule {}

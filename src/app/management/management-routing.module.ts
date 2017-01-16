import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ManagementComponent } from './components/management-container/management.component';
import { ShopsComponent } from './components/management-container/shops/shops.component';
import { ContractsComponent } from './components/management-container/contracts/contracts.component';
import { EditShopComponent } from './components/management-container/shops/edit-shop/edit-shop.component';
import { AddShopComponent } from './components/management-container/shops/create-shop/add-shop/add-shop.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'management',
                component: ManagementComponent,
                children: [
                    {
                        path: '',
                        redirectTo: '/management/shops',
                        pathMatch: 'full'
                    },
                    {
                        path: 'shops',
                        component: ShopsComponent
                    },
                    {
                        path: 'shops/add',
                        component: AddShopComponent
                    },
                    {
                        path: 'shops/edit/:shopID',
                        component: EditShopComponent
                    },
                    {
                        path: 'contracts',
                        component: ContractsComponent
                    }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class ManagementRoutingModule {}

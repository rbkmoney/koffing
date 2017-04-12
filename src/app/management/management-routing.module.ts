import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ManagementComponent } from './management.component';
import { ShopsComponent } from './shops/shops.component';
import { ContractsComponent } from './contracts/contracts.component';
import { ContractCreateComponent } from './contracts/contract-create/contract-create.component';
import { PayoutToolCreateComponent } from './contracts/payout-tool-create/payout-tool-create.component';
import { CreateShopWizardComponent } from 'koffing/management/shops/create-shop-wizard/create-shop-wizard.component';
import { ShopEditingComponent } from 'koffing/management/shops/shop-editing/shop-editing.component';

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
                        path: 'shops/create',
                        component: CreateShopWizardComponent
                    },
                    {
                        path: 'shops/:shopID/edit',
                        component: ShopEditingComponent
                    },
                    {
                        path: 'shops/:shopID/edit/contract/create',
                        component: ContractCreateComponent
                    },
                    {
                        path: 'shops/:shopID/edit/contract/:contractID/payoutTool/create',
                        component: PayoutToolCreateComponent
                    },
                    {
                        path: 'contracts',
                        component: ContractsComponent
                    },
                    {
                        path: 'contracts/create',
                        component: ContractCreateComponent
                    },
                    {
                        path: 'contracts/:contractID/payout-tool/create',
                        component: PayoutToolCreateComponent
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

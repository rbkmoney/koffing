import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EditShopComponent } from './components/shop-management/edit-shop/edit-shop.component';
import { ShopManagementComponent } from './components/shop-management/shop-management.component';
import { CreateContractComponent } from './components/shop-management/create-shop/create-contract/create-contract.component';
import { CreatePayoutAccountComponent } from './components/shop-management/create-shop/create-payout-account/create-payout-account.component';
import { CreateShopComponent } from './components/shop-management/create-shop/create-shop.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'shops', component: ShopManagementComponent },
            { path: 'shops/add', component: CreateShopComponent },
            { path: 'shops/edit/:shopID', component: EditShopComponent },
            { path: 'contracts/create', component: CreateContractComponent },
            { path: 'payacc/create', component: CreatePayoutAccountComponent }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class ShopsRoutingModule { }

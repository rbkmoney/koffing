import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AddShopComponent } from './components/shop-management/add-shop/add-shop.component';
import { EditShopComponent } from './components/shop-management/edit-shop/edit-shop.component';
import { ShopManagementComponent } from './components/shop-management/shop-management.component';
import { CreateContractComponent } from './components/create-contract/create-contract.component';
import { CreatePayoutAccountComponent } from './components/create-payout-account/create-payout-account.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'shops', component: ShopManagementComponent },
            { path: 'shops/add', component: AddShopComponent },
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

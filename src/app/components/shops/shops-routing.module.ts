import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShopsComponent } from './shops.component';
import { AddShopComponent } from './add-shop/add-shop.component';
import { EditShopComponent } from './edit-shop/edit-shop.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'shops', component: ShopsComponent },
            { path: 'shops/add', component: AddShopComponent },
            { path: 'shops/edit/:shopID', component: EditShopComponent }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class ShopsRoutingModule { }

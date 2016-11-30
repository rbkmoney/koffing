import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { ShopsComponent } from './shops.component';
import { ClaimsComponent } from './claims/claims.component';
import { ShopCreationComponent } from './claims/shop-creation/shop-creation.component';
import { ShopModificationComponent } from './claims/shop-modification/shop-modification.component';
import { ModificationDetailComponent } from './claims/modification-detail/modification-detail.component';
import { AddShopComponent } from './add-shop/add-shop.component';
import { EditShopComponent } from './edit-shop/edit-shop.component';
import { ShopsRoutingModule } from './shops-routing.module';
import { CommonModule } from '../../common/common.module';

@NgModule({
    imports: [
        BrowserModule,
        ShopsRoutingModule,
        HttpModule,
        FormsModule,
        CommonModule
    ],
    declarations: [
        ShopsComponent,
        ClaimsComponent,
        ShopCreationComponent,
        ShopModificationComponent,
        ModificationDetailComponent,
        AddShopComponent,
        EditShopComponent
    ]
})
export class ShopsModule { }

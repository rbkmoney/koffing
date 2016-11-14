import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule } from "@angular/http";

import { ShopsComponent } from "./shops.component";
import { ClaimsComponent } from "./claims/claims.component";
import { ShopCreationComponent } from './claims/shop-creation/shop-creation.component';
import { ShopModificationComponent } from './claims/shop-modification/shop-modification.component';
import { ModificationDetailComponent } from './claims/modification-detail/modification-detail.component';

import { ShopsRoutingModule } from "./shops-routing.module";

@NgModule({
    imports: [
        BrowserModule,
        ShopsRoutingModule,
        HttpModule
    ],
    declarations: [
        ShopsComponent,
        ClaimsComponent,
        ShopCreationComponent,
        ShopModificationComponent,
        ModificationDetailComponent
    ]
})
export class ShopsModule { }
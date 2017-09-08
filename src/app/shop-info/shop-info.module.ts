import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { CommonModule } from 'koffing/common/common.module';
import { BackendModule } from 'koffing/backend/backend.module';
import { DomainInfoModule } from 'koffing/domain-info/domain-info.module';
import { ShopInfoComponent } from './shop-info.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        BackendModule,
        DomainInfoModule,
    ],
    declarations: [
        ShopInfoComponent,
    ]
})
export class ShopInfoModule { }

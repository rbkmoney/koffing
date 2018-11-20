import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarModule } from 'primeng/primeng';

import { WalletsComponent } from './wallets.component';
import { WithdrawalsTableComponent } from './withdrawals-table/withdrawals-table.component';
import { SearchFormComponent } from './withdrawals-table/search-form/search-form.component';
import { CommonModule } from 'koffing/common/common.module';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        // BrowserAnimationsModule,
        CommonModule,
        CalendarModule,
        // BackendModule,
        // CheckoutModule
    ],
    declarations: [
        WalletsComponent,
        WithdrawalsTableComponent,
        SearchFormComponent
    ]
})
export class WalletsModule { }

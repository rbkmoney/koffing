import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarModule } from 'primeng/primeng';

import { CommonModule } from 'koffing/common/common.module';
import { WalletsComponent } from './wallets.component';
import { WithdrawalsTableComponent } from './withdrawals-table/withdrawals-table.component';
import { SearchFormComponent } from './withdrawals-table/search-form/search-form.component';
import { SearchResultComponent } from './withdrawals-table/search-result/search-result.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        CalendarModule
    ],
    declarations: [
        WalletsComponent,
        WithdrawalsTableComponent,
        SearchFormComponent,
        SearchResultComponent
    ]
})
export class WalletsModule { }

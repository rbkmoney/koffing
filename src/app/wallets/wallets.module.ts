import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarModule } from 'primeng/primeng';

import { CommonModule } from 'koffing/common/common.module';
import { WalletsComponent } from './wallets.component';
import { SearchResultComponent as WalletsSearchResultComponent } from './wallets-table/search-result/search-result.component';
import { WalletsTableComponent } from './wallets-table/wallets-table.component';

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, CommonModule, CalendarModule],
    declarations: [WalletsComponent, WalletsSearchResultComponent, WalletsTableComponent]
})
export class WalletsModule {}

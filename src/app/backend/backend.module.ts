import { NgModule } from '@angular/core';

import { CategoryService } from './services/category.service';
import { ContractService } from './services/contract.service';
import { InvoiceService } from './services/invoice.service';
import { ShopService } from './services/shop.service';
import { ConfigService } from './services/config.service';
import { AnalyticsService } from './services/analytics.service';
import { LocationService } from './services/location.service';
import { AccountsService } from './services/accounts.service';

@NgModule({
    providers: [
        AccountsService,
        CategoryService,
        ContractService,
        InvoiceService,
        ShopService,
        ConfigService,
        AnalyticsService,
        LocationService
    ]
})
export class BackendModule { }

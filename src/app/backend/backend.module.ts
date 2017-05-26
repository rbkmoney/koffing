import { NgModule } from '@angular/core';

import { CategoryService } from './services/category.service';
import { ContractService } from './services/contract.service';
import { ShopService } from './services/shop.service';
import { ConfigService } from './services/config.service';
import { WebhooksService } from './webhooks.service';
import { AnalyticsService } from './services/analytics.service';
import { LocationService } from './services/location.service';
import { AccountsService } from './services/accounts.service';
import { SearchService } from './search.service';

@NgModule({
    providers: [
        AccountsService,
        CategoryService,
        ContractService,
        ShopService,
        ConfigService,
        AnalyticsService,
        LocationService,
        SearchService,
        WebhooksService
    ]
})
export class BackendModule { }

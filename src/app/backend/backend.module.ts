import { NgModule } from '@angular/core';

import { CategoryService } from './services/category.service';
import { ContractService } from './services/contract.service';
import { InvoiceService } from './services/invoice.service';
import { ShopService } from './services/shop.service';
import { ConfigService } from './services/config.service';
import { AnalyticsService } from 'koffing/backend/analytics.service';
import { LocationService } from 'koffing/backend/location.service';
import { AccountsService } from 'koffing/backend/accounts.service';

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

export * from './services/category.service';
export * from './services/config.service';
export * from './services/contract.service';
export * from './services/invoice.service';
export * from './services/shop.service';

export * from './model/account.class';
export * from './model/invoice.class';

export * from './model/contract/bank-account.class';
export * from './model/contract/contract.class';
export * from './model/contract/contractor.class';
export * from './model/contract/legal-agreement.class';
export * from './model/contract/legal-entity.class';
export * from './model/contract/payout-tool.class';
export * from './model/contract/payout-tool-bank-account.class';
export * from './model/contract/payout-tool-details.class';
export * from './model/contract/russian-legal-entity.class';

export * from './model/payment-conversion-stat.class';
export * from './model/payment-geo-stat.class';
export * from './model/payment-conversion-stat.class';

export * from './model/shop/callback-handler.class';
export * from './model/shop/category.class';
export * from './model/shop/shop.class';
export * from './model/shop/shop-details.class';
export * from './model/shop/shop-location.class';

export * from './classes/shop-params.class';

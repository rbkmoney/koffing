import { NgModule } from '@angular/core';

import { CategoryService } from './services/category.service';
import { ClaimService } from './services/claim.service';
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
        ClaimService,
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
export * from './services/claim.service';
export * from './services/config.service';
export * from './services/contract.service';
export * from './services/invoice.service';
export * from './services/shop.service';

export * from './classes/account.class';
export * from './classes/bank-account.class';
export * from './classes/callback-handler.class';
export * from './classes/category.class';
export * from './classes/claim/claim.class';
export * from './classes/contract.class';
export * from './classes/contractor.class';
export * from './classes/conversion.class';
export * from './classes/legal-entity.class';
export * from './classes/invoice.class';
export * from './classes/payout-tool.class';
export * from './classes/payout-tool-params.class';
export * from './classes/payout-tool-bank-account.class';
export * from './classes/revenue.class';
export * from './classes/russian-legal-entity.class';
export * from './classes/shop.class';
export * from './classes/shop-details.class';
export * from './classes/shop-item.class';
export * from './classes/shop-location.class';
export * from './classes/shop-params.class';
export * from './classes/claim/contract-creation.class';
export * from './classes/claim/contract-modification.class';
export * from './classes/claim/contract-payout-tool-creation.class';
export * from './classes/claim/shop-creation.class';
export * from './classes/claim/shop-modification.class';
export * from './classes/claim/shop-update.class';

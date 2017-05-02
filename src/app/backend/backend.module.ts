import { NgModule } from '@angular/core';

import { ConfigService } from './services/config.service';
import { ClaimService } from './services/claim.service';
import { ShopService } from './services/shop.service';
import { CategoryService } from './services/category.service';
import { ContractService } from './services/contract.service';
import { AccountService } from './services/accounts.service';
import { InvoiceService } from './services/invoice.service';
import { PaymentsService } from './services/payments.service';
import { geolocationService } from './services/geolocation.service';
import { CustomerService } from './services/customer.service';

@NgModule({
    providers: [
        ConfigService,
        ClaimService,
        ShopService,
        CategoryService,
        ContractService,
        AccountService,
        InvoiceService,
        PaymentsService,
        geolocationService,
        CustomerService
    ]
})
export class BackendModule { }

export * from './services/config.service';
export * from './services/claim.service';
export * from './services/shop.service';
export * from './services/category.service';
export * from './services/contract.service';
export * from './services/accounts.service';
export * from './services/invoice.service';
export * from './services/payments.service';
export * from './services/geolocation.service';
export * from './services/customer.service';

export * from './classes/request-params.class';
export * from './model/invoice.class';
export * from './model/statistics/location-name.class';
export * from './model/statistics/payment-conversion-stat.class';
export * from './model/statistics/payment-geo-stat.class';
export * from './model/statistics/payment-revenue-stat.class';

export * from './model/shop/shop.class';
export * from './model/shop/shop-account.class';
export * from './model/shop/shop-details.class';
export * from './model/shop/shop-location.class';
export * from './model/shop/shop-location-url.class';
export * from './model/shop/callback-handler.class';
export * from './model/shop/category.class';

export * from './model/contract/contract.class';
export * from './model/contract/contractor.class';
export * from './model/contract/payout-tool.class';
export * from './model/contract/payout-tool-details.class';
export * from './model/contract/payout-tool-bank-account.class';
export * from './model/contract/bank-account.class';
export * from './model/contract/legal-agreement.class';
export * from './model/contract/legal-entity.class';
export * from './model/contract/russian-legal-entity.class';

export * from './model/claim/claim.class';
export * from './model/claim/party-modification.class';
export * from './model/claim/shop-modification.class';
export * from './model/claim/shop-modification/shop-creation.class';
export * from './model/claim/shop-modification/shop-account-creation.class';
export * from './model/claim/shop-modification/shop-callback-handler-setup.class';
export * from './model/claim/shop-modification/shop-callback-handler-teardown.class';
export * from './model/claim/shop-modification/shop-category-change.class';
export * from './model/claim/shop-modification/shop-contract-binding.class';
export * from './model/claim/shop-modification/shop-details-change.class';
export * from './model/claim/shop-modification/shop-location-change.class';
export * from './model/claim/contract-modification.class';
export * from './model/claim/contract-modification/contract-creation.class';
export * from './model/claim/contract-modification/contract-payout-tool-creation.class';
export * from './model/claim/contract-modification/contract-adjustment-creation.class';
export * from './model/claim/contract-modification/contract-legal-agreement-binding.class';
export * from './model/claim/contract-modification/contract-termination.class';

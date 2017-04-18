import { NgModule } from '@angular/core';

import { ConfigService } from './services/config.service';
import { HttpClaimService } from './services/http-claim.service';
import { HttpShopService } from './services/http-shop.service';
import { HttpCategoryService } from './services/http-category.service';
import { HttpContractService } from './services/http-contract.service';
import { HttpAccountService } from './services/http-accounts.service';
import { HttpInvoiceService } from './services/http-invoice.service';
import { HttpPaymentsService } from './services/http-payments.service';
import { HttpGeolocationService } from './services/http-geolocation.service';
import { HttpCustomerService } from './services/http-customer.service';

@NgModule({
    providers: [
        ConfigService,
        HttpClaimService,
        HttpShopService,
        HttpCategoryService,
        HttpContractService,
        HttpAccountService,
        HttpInvoiceService,
        HttpPaymentsService,
        HttpGeolocationService,
        HttpCustomerService
    ]
})
export class BackendModule { }

export * from './services/config.service';
export * from './services/http-claim.service';
export * from './services/http-shop.service';
export * from './services/http-category.service';
export * from './services/http-contract.service';
export * from './services/http-accounts.service';
export * from './services/http-invoice.service';
export * from './services/http-payments.service';
export * from './services/http-geolocation.service';
export * from './services/http-customer.service';

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

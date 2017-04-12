import { NgModule } from '@angular/core';

import { AccountService } from './services/accounts.service';
import { CategoryService } from './services/category.service';
import { ContractService } from './services/contract.service';
import { CustomerService } from './services/customer.service';
import { InvoiceService } from './services/invoice.service';
import { PaymentsService } from './services/payments.service';
import { ShopService } from './services/shop.service';
import { ConfigService } from './services/config.service';
import { GeolocationService } from './services/geolocation.service';
import { ClaimService } from './services/claim.service';

@NgModule({
    providers: [
        AccountService,
        CategoryService,
        ContractService,
        CustomerService,
        InvoiceService,
        PaymentsService,
        ShopService,
        ConfigService,
        GeolocationService,
        ClaimService
    ]
})
export class BackendModule { }

export * from './services/accounts.service';
export * from './services/category.service';
export * from './services/config.service';
export * from './services/contract.service';
export * from './services/customer.service';
export * from './services/invoice.service';
export * from './services/payments.service';
export * from './services/shop.service';
export * from './services/geolocation.service';
export * from './services/claim.service';

export * from './classes/account.class';
export * from './classes/callback-handler.class';
export * from './classes/category.class';
export * from './classes/conversion.class';
export * from './classes/geodata.class';
export * from './classes/invoice.class';
export * from './classes/payout-tool.class';
export * from './classes/payout-tool-params.class';
export * from './classes/request-params.class';
export * from './classes/revenue.class';
export * from './classes/shop.class';
export * from './classes/shop-details.class';
export * from './classes/shop-item.class';
export * from './classes/shop-location.class';
export * from './classes/location-name.class';
export * from './classes/shop-params.class';

// todo добавить эти классы вместо старых
// export * from './model/shop/shop-details.class';
// export * from './model/shop/shop-location.class';

export * from './model/contract/contract.class';
export * from './model/contract/contractor.class';
export * from './model/contract/bank-account.class';
export * from './model/contract/payout-tool-bank-account.class';
export * from './model/contract/legal-agreement.class';
export * from './model/contract/legal-entity.class';
export * from './model/contract/russian-legal-entity.class';

import { NgModule } from '@angular/core';

import { AccountService } from './services/accounts.service';
import { CategoryService } from './services/category.service';
import { ClaimService } from './services/claim.service';
import { CustomerService } from './services/customer.service';
import { InvoiceService } from './services/invoice.service';
import { PaymentsService } from './services/payments.service';
import { ShopService } from './services/shop.service';
import { ConfigService } from './services/config.service';

@NgModule({
    providers: [
        AccountService,
        CategoryService,
        ClaimService,
        CustomerService,
        InvoiceService,
        PaymentsService,
        ShopService,
        ConfigService
    ]
})
export class BackendModule { }

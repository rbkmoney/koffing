import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/primeng';

import { EventPollerService } from './event-poller.service';
import { ClaimSupportService } from './claim-support.service';
import { SelectComponent } from './select/select.component';
import { LoadingComponent } from './loading/loading.component';
import { MinValueValidatorDirective } from './min-value.directive';
import { MaxValueValidatorDirective } from './max-value.directive';
import { RoubleCurrencyPipe } from './rouble-currency.pipe';
import { DateRangeSelectorComponent } from './date-range-selector/date-range-selector.component';
import { InvoiceStatusPipe } from './invoice-statuses.pipe';
import { PaymentStatusPipe } from './payment-statuses.pipe';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CalendarModule
    ],
    declarations: [
        SelectComponent,
        LoadingComponent,
        MinValueValidatorDirective,
        MaxValueValidatorDirective,
        RoubleCurrencyPipe,
        DateRangeSelectorComponent,
        InvoiceStatusPipe,
        PaymentStatusPipe
    ],
    exports: [
        SelectComponent,
        LoadingComponent,
        MinValueValidatorDirective,
        MaxValueValidatorDirective,
        RoubleCurrencyPipe,
        DateRangeSelectorComponent,
        InvoiceStatusPipe,
        PaymentStatusPipe
    ],
    providers: [
        EventPollerService,
        ClaimSupportService
    ]
})
export class CommonModule { }

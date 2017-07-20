import { Component, OnInit } from '@angular/core';

import { SelectItem } from 'koffing/common/select/select-item';
import { AnalyticsService } from './analytics.service';
import { CheckoutConfigFormService } from './payment-link/checkout-config-form.service';
import { InvoiceTemplateFormService } from './payment-link/invoice-template-form.service';

@Component({
    selector: 'kof-analytics',
    templateUrl: './analytics.component.pug',
    providers: [ AnalyticsService, CheckoutConfigFormService, InvoiceTemplateFormService ],
    styles: [`
        .shop-selector {
            padding-bottom: 10px;
        }
    `]
})
export class AnalyticsComponent implements OnInit {

    public currentShopID: string;
    public shopItems: SelectItem[] = [];
    public isLoading: boolean = true;

    constructor(private analyticsService: AnalyticsService) { }

    public ngOnInit() {
        this.analyticsService.getShopItems().subscribe((shopItems: SelectItem[]) => {
            this.isLoading = false;
            this.currentShopID = this.analyticsService.getActiveShopID();
            this.shopItems = shopItems;
            this.navigate();
        });
    }

    public navigate() {
        this.analyticsService.navigateToShop(this.currentShopID);
    }
}

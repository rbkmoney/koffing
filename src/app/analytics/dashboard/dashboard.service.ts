import { Injectable } from '@angular/core';

import { LocationService } from 'koffing/backend/location.service';
import { AnalyticsService } from 'koffing/backend/analytics.service';
import { ShopService } from 'koffing/backend/services/shop.service';
import { AccountsService } from 'koffing/backend/accounts.service';
import { ChartDataConversionService } from 'koffing/analytics/dashboard/chart-data-conversion.service';
import { PaymentMethodChartData } from 'koffing/analytics/dashboard/chart-data/payment-method-chart-data.class';
import { PaymentConversionData } from 'koffing/analytics/dashboard/chart-data/payment-conversion-data.class';

@Injectable()
export class DashboardService {

    constructor(private accountsService: AccountsService,
                private shopService: ShopService,
                private analyticsService: AnalyticsService,
                private locationService: LocationService) {
    }

    public getPaymentMethodChartData(shopID: number, from: Date, to: Date): Promise<PaymentMethodChartData> {
        return this.analyticsService.getPaymentMethodStats(shopID, from, to).then((paymentMethodStats) => {
            return ChartDataConversionService.toPaymentMethodChartData(paymentMethodStats);
        });
    }

    public getUniqueCount(shopID: number, from: Date, to: Date): Promise<number> {
        return this.analyticsService.getPaymentRateStats(shopID, from, to).then((paymentRateStat) => {
            return paymentRateStat ? paymentRateStat.uniqueCount : 0;
        });
    }

    public getPaymentConversionData(shopID: number, from: Date, to: Date): Promise<PaymentConversionData> {
        return this.analyticsService.getPaymentConversionStats(shopID, from, to).then((paymentConversionStat) => {
            const paymentCount = ChartDataConversionService.toPaymentCountInfo(paymentConversionStat);
            const conversionChartData = ChartDataConversionService.toConversionChartData(paymentConversionStat);
            return new PaymentConversionData(paymentCount, conversionChartData);
        });
    }
}

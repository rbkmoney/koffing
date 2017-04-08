import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { LocationService } from 'koffing/backend/location.service';
import { AnalyticsService } from 'koffing/backend/analytics.service';
import { PaymentMethodChartData } from 'koffing/analytics/dashboard/chart-data/payment-method-chart-data.class';
import { PaymentConversionData } from 'koffing/analytics/dashboard/chart-data/payment-conversion-data.class';
import { PaymentGeoChartData } from 'koffing/analytics/dashboard/chart-data/payment-geo-chart-data.class';
import { PaymentRevenueData } from 'koffing/analytics/dashboard/chart-data/payment-revenue-data.class';
import { ChartDataConverter } from 'koffing/analytics/dashboard/chart-data/chart-data.converter';

@Injectable()
export class DashboardService {

    constructor(private analyticsService: AnalyticsService,
                private locationService: LocationService) {
    }

    public getPaymentMethodChartData(shopID: number, from: Date, to: Date): Observable<PaymentMethodChartData[]> {
        return this.analyticsService.getPaymentMethodStats(shopID, from, to)
            .map((paymentMethodStats) => ChartDataConverter.toPaymentMethodChartData(paymentMethodStats));
    }

    public getUniqueCount(shopID: number, from: Date, to: Date): Observable<number> {
        return this.analyticsService.getPaymentRateStats(shopID, from, to)
            .map((paymentRateStat) => paymentRateStat ? paymentRateStat.uniqueCount : 0);
    }

    public getPaymentConversionData(shopID: number, from: Date, to: Date): Observable<PaymentConversionData> {
        return this.analyticsService.getPaymentConversionStats(shopID, from, to).map((paymentConversionStat) => {
            const paymentCount = ChartDataConverter.toPaymentCountInfo(paymentConversionStat);
            const conversionChartData = ChartDataConverter.toConversionChartData(from, paymentConversionStat);
            return {paymentCount, conversionChartData};
        });
    }

    public getPaymentGeoChartData(shopID: number, from: Date, to: Date): Observable<PaymentGeoChartData> {
        return Observable.create((observer: Observer<PaymentGeoChartData>) => {
            this.analyticsService.getPaymentGeoStats(shopID, from, to).subscribe((paymentGeoStat) => {
                const data = ChartDataConverter.toGeoChartData(paymentGeoStat);
                if (data.geoIDs.length === 0) { // TODO fix it
                    observer.next(data);
                } else {
                    this.locationService.getLocationsNames(data.geoIDs)
                        .subscribe((locationNames) => {
                            data.cityNames = locationNames.map(locationName => locationName.name);
                            observer.next(data);
                        });
                }
            });
        });
    }

    public getPaymentRevenueData(shopID: number, from: Date, to: Date): Observable<PaymentRevenueData> {
        return this.analyticsService.getPaymentRevenueStats(shopID, from, to).map((paymentRevenueStat) => {
            const profit = ChartDataConverter.toTotalProfit(paymentRevenueStat);
            const revenueChartData = ChartDataConverter.toRevenueChartData(paymentRevenueStat);
            return {profit, revenueChartData};
        });
    }
}

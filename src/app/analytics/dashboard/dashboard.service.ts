import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { LocationService } from 'koffing/backend/location.service';
import { AnalyticsService } from 'koffing/backend/analytics.service';
import { PaymentConversionData } from 'koffing/analytics/dashboard/chart-data/payment-conversion-data.class';
import { PaymentRevenueData } from 'koffing/analytics/dashboard/chart-data/payment-revenue-data.class';
import { ChartDataConverter } from 'koffing/analytics/dashboard/chart-data/chart-data.converter';
import { DoughnutChartData } from 'koffing/analytics/dashboard/chart-data/doughnut-chart-data';

@Injectable()
export class DashboardService {

    constructor(private analyticsService: AnalyticsService,
                private locationService: LocationService) {
    }

    public getPaymentMethodChartData(shopID: number, from: Date, to: Date): Observable<DoughnutChartData> {
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

    public getPaymentGeoChartData(shopID: number, from: Date, to: Date): Observable<DoughnutChartData> {
        return Observable.create((observer: Observer<DoughnutChartData>) => {
            this.analyticsService.getPaymentGeoStats(shopID, from, to).subscribe((paymentGeoStat) => {
                const data = ChartDataConverter.toGeoChartData(paymentGeoStat);
                if (data.data.length === 0) { // TODO fix it
                    observer.next(data);
                } else {
                    this.locationService.getLocationsNames(data.labels)
                        .subscribe((locationNames) => {
                            data.labels = locationNames.map(locationName => locationName.name);
                            observer.next(data);
                        });
                }
            });
        });
    }

    public getPaymentRevenueData(shopID: number, from: Date, to: Date): Observable<PaymentRevenueData> {
        return this.analyticsService.getPaymentRevenueStats(shopID, from, to).map((paymentRevenueStat) => {
            const profit = ChartDataConverter.toTotalProfit(paymentRevenueStat);
            const revenueChartData = ChartDataConverter.toRevenueChartData(from, paymentRevenueStat);
            return {profit, revenueChartData};
        });
    }
}

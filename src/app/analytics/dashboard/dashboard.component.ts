import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';

import { ChartDataConversionService } from './chart-data-conversion.service';
import { ShopService }  from 'koffing/backend/services/shop.service';
import { GeoChartLabeled } from './geo-chart-labeled.class';
import { Shop } from 'koffing/backend/classes/shop.class';
import { DateRange } from 'koffing/analytics/dashboard/date-range-selector/date-range.class';
import { AnalyticsService } from 'koffing/backend/analytics.service';
import { PaymentGeoStat } from 'koffing/backend/model/payment-geo-stat.class';
import { LocationService } from 'koffing/backend/location.service';
import { LocationName } from 'koffing/backend/model/location-name.class';
import { PaymentRevenueStat } from 'koffing/backend/model/payment-revenue-stat.class';
import { AccountsService } from 'koffing/backend/accounts.service';
import { Account } from 'koffing/backend/model/account.class';
import { DashboardService } from 'koffing/analytics/dashboard/dashboard.service';
import { PaymentMethodChartData } from 'koffing/analytics/dashboard/chart-data/payment-method-chart-data.class';

@Component({
    templateUrl: './dashboard.component.pug',
    providers: [DashboardService]
})
export class DashboardComponent implements OnInit {

    public shopID: number;
    public fromTime: Date = moment().subtract(1, 'month').hour(0).minute(0).second(0).toDate();
    public toTime: Date = moment().hour(23).minute(59).second(59).toDate();

    public uniqueCount: any;
    public successfulCount: any;
    public unfinishedCount: any;
    public profit: any;
    public guaranteeBalance: any;
    public settlementBalance: any;
    public revenueChartData: any;
    public conversionChartData: any;
    public geoChartData: GeoChartLabeled;
    public paymentMethodChartData: PaymentMethodChartData;

    public revenueLoading: boolean;
    public conversionLoading: boolean;
    public paymentMethodLoading: boolean;
    public geoLoading: boolean;
    public rateLoading: boolean;
    public guaranteeLoading: boolean;
    public settlementLoading: boolean;

    constructor(
        private route: ActivatedRoute,
        private accountsService: AccountsService,
        private shopService: ShopService,
        private analyticsService: AnalyticsService,
        private locationService: LocationService,
        private dashboardService: DashboardService
    ) {}

    public ngOnInit() {
        this.route.parent.params.subscribe((params: Params) => {
            this.shopID = Number(params['shopID']);
            this.loadData(new DateRange(this.fromTime, this.toTime));
        });
    }

    public loadData(dateRange: DateRange) {
        const shopID = this.shopID;
        this.loadPaymentMethod(shopID, dateRange.from, dateRange.to);
        this.loadRate(shopID, dateRange.from, dateRange.to);
        this.loadConversionStat(shopID, dateRange.from, dateRange.to);
        this.loadGeoChartData(shopID, dateRange.from, dateRange.to);
        this.loadRevenueStat(shopID, dateRange.from, dateRange.to);
        this.loadAccounts(shopID);
    }

    private loadPaymentMethod(shopID: number, fromTime: Date, toTime: Date) {
        this.paymentMethodLoading = true;
        this.dashboardService.getPaymentMethodChartData(shopID, fromTime, toTime).then((chartData) => {
            this.paymentMethodLoading = false;
            this.paymentMethodChartData = chartData;
        });
    }

    private loadRate(shopID: number, from: Date, to: Date) {
        this.rateLoading = true;
        this.dashboardService.getUniqueCount(shopID, from, to).then((count) => {
            this.rateLoading = false;
            this.uniqueCount = count;
        });
    }

    private loadConversionStat(shopID: number, from: Date, to: Date) {
        this.conversionLoading = true;
        this.dashboardService.getPaymentConversionData(shopID, from, to).then((paymentConversionData) => {
            this.conversionLoading = false;
            this.successfulCount = paymentConversionData.paymentCount.successfulCount;
            this.unfinishedCount = paymentConversionData.paymentCount.unfinishedCount;
            this.conversionChartData = paymentConversionData.conversionChartData;
        });
    }

    private loadGeoChartData(shopID: number, fromTime: Date, toTime: Date) {
        this.geoLoading = true;
        this.analyticsService.getPaymentGeoStats(shopID, fromTime, toTime).then((paymentGeoStat: PaymentGeoStat[]) => {
            this.geoLoading = false;
            const unlabeledGeoChartData: any = ChartDataConversionService.toGeoChartData(paymentGeoStat);
            if (unlabeledGeoChartData.geoIDs.length > 0 && unlabeledGeoChartData.data.length > 0) {
                this.locationService.getLocationsNames(unlabeledGeoChartData.geoIDs).then((locationNames: LocationName[]) => {
                    this.geoChartData = ChartDataConversionService.toLabeledGeoChartData(unlabeledGeoChartData, locationNames);
                });
            } else {
                this.geoChartData = new GeoChartLabeled([], []);
            }
        });
    }

    private loadRevenueStat(shopID: number, fromTime: Date, toTime: Date) {
        this.revenueLoading = true;
        this.analyticsService.getPaymentRevenueStats(shopID, fromTime, toTime).then((paymentRevenueStat: PaymentRevenueStat[]) => {
            this.revenueLoading = false;
            this.revenueChartData = ChartDataConversionService.toRevenueChartData(paymentRevenueStat);
            this.profit = ChartDataConversionService.toTotalProfit(paymentRevenueStat);
        });
    }

    private loadAccounts(shopID: number) {
        this.shopService.getShop(shopID).then((shop: Shop) => {
            this.guaranteeLoading = true;
            this.accountsService.getAccountByID(shop.account.guaranteeID).then((account: Account) => {
                this.guaranteeLoading = false;
                this.guaranteeBalance = account.ownAmount;
            });
            this.settlementLoading = true;
            this.accountsService.getAccountByID(shop.account.settlementID).then((account: Account) => {
                this.settlementLoading = false;
                this.settlementBalance = account.ownAmount;
            });
        });
    }
}

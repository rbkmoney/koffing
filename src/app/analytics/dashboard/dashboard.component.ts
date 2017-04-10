import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';
import { Subject } from 'rxjs/Subject';

import { ShopService }  from 'koffing/backend/services/shop.service';
import { Shop } from 'koffing/backend/classes/shop.class';
import { DateRange } from 'koffing/analytics/dashboard/date-range-selector/date-range.class';
import { AccountsService } from 'koffing/backend/accounts.service';
import { Account } from 'koffing/backend/model/account.class';
import { DashboardService } from 'koffing/analytics/dashboard/dashboard.service';
import { LineChartData } from 'koffing/analytics/dashboard/chart-data/line-chart-data';
import { DoughnutChartData } from 'koffing/analytics/dashboard/chart-data/doughnut-chart-data';

@Component({
    templateUrl: './dashboard.component.pug',
    providers: [DashboardService]
})
export class DashboardComponent implements OnInit {

    public shopID: number;
    public fromTime: Date = moment().subtract(1, 'month').hour(0).minute(0).second(0).toDate();
    public toTime: Date = moment().hour(23).minute(59).second(59).toDate();

    public uniqueCount: number;
    public successfulCount: number;
    public unfinishedCount: number;
    public profit: number;
    public guaranteeBalance: number;
    public settlementBalance: number;
    public revenueChartData: Subject<LineChartData> = new Subject();
    public conversionChartData: Subject<LineChartData> = new Subject();
    public geoChartData: DoughnutChartData;
    public paymentMethodChartData: DoughnutChartData;

    public revenueLoading: boolean;
    public conversionLoading: boolean;
    public paymentMethodLoading: boolean;
    public geoLoading: boolean;
    public rateLoading: boolean;
    public guaranteeLoading: boolean;
    public settlementLoading: boolean;

    constructor(private route: ActivatedRoute,
                private accountsService: AccountsService,
                private shopService: ShopService,
                private dashboardService: DashboardService) {
    }

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
        this.dashboardService.getPaymentMethodChartData(shopID, fromTime, toTime).subscribe((data) => {
            this.paymentMethodLoading = false;
            this.paymentMethodChartData = data;
        });
    }

    private loadRate(shopID: number, from: Date, to: Date) {
        this.rateLoading = true;
        this.dashboardService.getUniqueCount(shopID, from, to).subscribe((count) => {
            this.rateLoading = false;
            this.uniqueCount = count;
        });
    }

    private loadConversionStat(shopID: number, from: Date, to: Date) {
        this.conversionLoading = true;
        this.dashboardService.getPaymentConversionData(shopID, from, to).subscribe((data) => {
            this.conversionLoading = false;
            this.successfulCount = data.paymentCount.successfulCount;
            this.unfinishedCount = data.paymentCount.unfinishedCount;
            this.conversionChartData.next(data.conversionChartData);
        });
    }

    private loadGeoChartData(shopID: number, from: Date, to: Date) {
        this.geoLoading = true;
        this.dashboardService.getPaymentGeoChartData(shopID, from, to).subscribe((data) => {
            this.geoLoading = false;
            this.geoChartData = data;
        });
    }

    private loadRevenueStat(shopID: number, from: Date, to: Date) {
        this.revenueLoading = true;
        this.dashboardService.getPaymentRevenueData(shopID, from, to).subscribe((data) => {
            this.revenueLoading = false;
            this.profit = data.profit;
            this.revenueChartData.next(data.revenueChartData);
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

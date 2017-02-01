import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';

import { ChartDataConversionService } from './chart-data-conversion.service';
import { ShopService }  from 'koffing/backend/services/shop.service';
import { AccountService } from 'koffing/backend/backend.module';
import { CustomerService } from 'koffing/backend/backend.module';
import { PaymentsService } from 'koffing/backend/backend.module';
import { RequestParams } from 'koffing/backend/backend.module';
import { GeoData } from 'koffing/backend/backend.module';
import { Conversion } from 'koffing/backend/backend.module';
import { Shop } from 'koffing/backend/classes/shop.class';

@Component({
    templateUrl: './dashboard.component.pug',
    styleUrls: ['./dashboard.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

    public fromTime: any;
    public toTime: any;
    public fromTimeDate: Date;
    public toTimeDate: Date;
    public uniqueCount: any;
    public successfulCount: any;
    public unfinishedCount: any;
    public profit: any;
    public guaranteeBalance: any;
    public settlementBalance: any;
    public revenueChartData: any;
    public conversionChartData: any;
    public geoChartData: GeoData[] = [];
    public paymentMethodChartData: any;

    private shopID: number;

    constructor(
        private route: ActivatedRoute,
        private customerService: CustomerService,
        private paymentsService: PaymentsService,
        private accountService: AccountService,
        private shopService: ShopService
    ) {}

    public ngOnInit() {
        this.toTimeDate = new Date();
        this.fromTimeDate = new Date();
        this.fromTimeDate.setMonth(this.fromTimeDate.getMonth() - 1);

        this.fromTime = moment(this.fromTimeDate).format();
        this.toTime = moment(this.toTimeDate).format();

        this.route.parent.params.subscribe((params: Params) => {
            this.shopID = Number(params['shopID']);
            this.loadData();
        });
    }

    private loadData() {
        this.loadPaymentMethod();
        this.loadGeoChartData();
        this.loadRate();
        this.loadConversionStat();
        this.loadRevenueStat();
        this.loadAccounts();
    }

    private loadPaymentMethod() {
        this.customerService.getPaymentMethod(
            this.shopID,
            new RequestParams(this.fromTime, this.toTime, 'minute', '1', 'bank_card')
        ).then((paymentMethodState: any) => {
            this.paymentMethodChartData = ChartDataConversionService.toPaymentMethodChartData(paymentMethodState);
        });
    }

    private loadGeoChartData() {
        this.paymentsService.getGeoChartData(
            this.shopID,
            new RequestParams(this.fromTime, this.toTime, 'day', '1')
        ).then((geoData: GeoData[]) => {
            this.geoChartData = ChartDataConversionService.toGeoChartData(geoData);
        });
    }

    private loadRate() {
        this.customerService.getRate(
            this.shopID,
            new RequestParams(this.fromTime, this.toTime)
        ).then((rateStat: any) => {
            this.uniqueCount = rateStat[0] ? rateStat[0].uniqueCount : 0;
        });
    }

    private loadConversionStat() {
        this.paymentsService.getConversionStat(
            this.shopID,
            new RequestParams(this.fromTime, this.toTime, 'minute', '1')
        ).then((conversionStat: Conversion[]) => {
            const paymentCountInfo = ChartDataConversionService.toPaymentCountInfo(conversionStat);
            this.successfulCount = paymentCountInfo.successfulCount;
            this.unfinishedCount = paymentCountInfo.unfinishedCount;
            this.conversionChartData = ChartDataConversionService.toConversionChartData(conversionStat);
        });
    }

    private loadRevenueStat() {
        this.paymentsService.getRevenueStat(
            this.shopID,
            new RequestParams(this.fromTime, this.toTime, 'minute', '1')
        ).then((revenueStat: any) => {
            this.revenueChartData = ChartDataConversionService.toRevenueChartData(revenueStat);
            this.profit = ChartDataConversionService.toTotalProfit(revenueStat);
        });
    }

    private loadAccounts() {
        this.shopService.getShop(this.shopID).then((shop: Shop) => {
            this.accountService.getAccount(shop.account.guaranteeID).then((account: any) => {
                this.guaranteeBalance = account.ownAmount;
            });
            this.accountService.getAccount(shop.account.settlementID).then((account: any) => {
                this.settlementBalance = account.ownAmount;
            });
        });
    }
}

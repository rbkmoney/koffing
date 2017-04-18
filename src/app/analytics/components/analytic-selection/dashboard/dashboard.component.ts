import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';

import { ChartDataConversionService } from './chart-data-conversion.service';
import { HttpShopService }  from 'koffing/backend/backend.module';
import { HttpAccountService } from 'koffing/backend/backend.module';
import { HttpCustomerService } from 'koffing/backend/backend.module';
import { HttpPaymentsService } from 'koffing/backend/backend.module';
import { RequestParams } from 'koffing/backend/backend.module';
import { PaymentGeoStat } from 'koffing/backend/backend.module';
import { PaymentConversionStat } from 'koffing/backend/backend.module';
import { HttpGeolocationService } from 'koffing/backend/backend.module';
import { LocationName } from 'koffing/backend/backend.module';
import { GeoChartLabeled } from './geo-chart-labeled.class';
import { GeoChartData } from './geo-chart-data.class';

@Component({
    templateUrl: './dashboard.component.pug',
    styleUrls: ['./dashboard.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

    public shopID: string;
    public fromTime: Date;
    public toTime: Date;
    public uniqueCount: any;
    public successfulCount: any;
    public unfinishedCount: any;
    public profit: any;
    public guaranteeBalance: any;
    public settlementBalance: any;
    public revenueChartData: any;
    public conversionChartData: any;
    public geoChartData: GeoChartLabeled;
    public paymentMethodChartData: any;
    public revenueLoading: boolean;
    public conversionLoading: boolean;
    public paymentMethodLoading: boolean;
    public geoLoading: boolean;
    public rateLoading: boolean;
    public guaranteeLoading: boolean;
    public settlementLoading: boolean;
    public isInvalidDate = false;

    constructor(
        private route: ActivatedRoute,
        private httpCustomerService: HttpCustomerService,
        private httpPaymentsService: HttpPaymentsService,
        private httpAccountService: HttpAccountService,
        private httpShopService: HttpShopService,
        private httpGeolocationService: HttpGeolocationService
    ) {}

    public ngOnInit() {
        this.fromTime = moment().subtract(1, 'month').hour(0).minute(0).second(0).toDate();
        this.toTime = moment().hour(23).minute(59).second(59).toDate();

        this.route.parent.params.subscribe((params: Params) => {
            this.shopID = params['shopID'];
            this.loadData();
        });
    }

    public selectFromTime() {
        this.fromTime = moment(this.fromTime).hour(0).minute(0).second(0).toDate();
    }

    public selectToTime() {
        this.toTime = moment(this.toTime).hour(23).minute(59).second(59).toDate();
    }

    public loadData() {
        if (this.fromTime.getTime() >= this.toTime.getTime()) {
            this.isInvalidDate = true;
            return false;
        }
        this.isInvalidDate = false;

        const shopID = this.shopID;
        const fromTime = moment(this.fromTime).format();
        const toTime = moment(this.toTime).format();

        this.loadPaymentMethod(shopID, fromTime, toTime);
        this.loadGeoChartData(shopID, fromTime, toTime);
        this.loadRate(shopID, fromTime, toTime);
        this.loadConversionStat(shopID, fromTime, toTime);
        this.loadRevenueStat(shopID, fromTime, toTime);
        this.loadAccounts(shopID);
    }

    private loadPaymentMethod(shopID: string, fromTime: string, toTime: string) {
        this.paymentMethodLoading = true;
        this.httpCustomerService.getPaymentMethod(shopID, new RequestParams(fromTime, toTime)).then((paymentMethodState: any) => {
            this.paymentMethodLoading = false;
            this.paymentMethodChartData = ChartDataConversionService.toPaymentMethodChartData(paymentMethodState);
        });
    }

    private loadRate(shopID: string, fromTime: string, toTime: string) {
        this.rateLoading = true;
        this.httpCustomerService.getRate(shopID, new RequestParams(fromTime, toTime)).then((rateStat: any) => {
            this.rateLoading = false;
            this.uniqueCount = rateStat ? rateStat.uniqueCount : 0;
        });
    }

    private loadConversionStat(shopID: string, fromTime: string, toTime: string) {
        this.conversionLoading = true;
        this.httpPaymentsService.getConversionStat(shopID, new RequestParams(fromTime, toTime)).then((conversion: PaymentConversionStat[]) => {
            this.conversionLoading = false;
            const paymentCountInfo = ChartDataConversionService.toPaymentCountInfo(conversion);
            this.successfulCount = paymentCountInfo.successfulCount;
            this.unfinishedCount = paymentCountInfo.unfinishedCount;
            this.conversionChartData = ChartDataConversionService.toConversionChartData(conversion);
        });
    }

    private loadGeoChartData(shopID: string, fromTime: string, toTime: string) {
        this.geoLoading = true;
        this.httpGeolocationService.getGeoChartData(shopID, new RequestParams(fromTime, toTime, 'day')
        ).then((geoData: PaymentGeoStat[]) => {
            this.geoLoading = false;
            const unlabeledGeoChartData: GeoChartData = ChartDataConversionService.toGeoChartData(geoData);
            if (unlabeledGeoChartData.geoIDs.length > 0 && unlabeledGeoChartData.data.length > 0) {
                this.httpGeolocationService.getLocationNames(unlabeledGeoChartData.geoIDs, 'ru').then((locationNames: LocationName[]) => {
                    this.geoChartData = ChartDataConversionService.toLabeledGeoChartData(unlabeledGeoChartData, locationNames);
                });
            } else {
                this.geoChartData = new GeoChartLabeled([], []);
            }
        });
    }

    private loadRevenueStat(shopID: string, fromTime: string, toTime: string) {
        this.revenueLoading = true;
        this.httpPaymentsService.getRevenueStat(shopID, new RequestParams(fromTime, toTime)).then((revenueStat: any) => {
            this.revenueLoading = false;
            this.revenueChartData = ChartDataConversionService.toRevenueChartData(revenueStat);
            this.profit = ChartDataConversionService.toTotalProfit(revenueStat);
        });
    }

    private loadAccounts(shopID: string) {
        this.httpShopService.getShop(shopID).then((shop: any) => {
            this.guaranteeLoading = true;
            this.httpAccountService.getAccount(shop.account.guaranteeID).then((account: any) => {
                this.guaranteeLoading = false;
                this.guaranteeBalance = account.ownAmount;
            });
            this.settlementLoading = true;
            this.httpAccountService.getAccount(shop.account.settlementID).then((account: any) => {
                this.settlementLoading = false;
                this.settlementBalance = account.ownAmount;
            });
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';

import { ChartDataConversionService } from './chart-data-conversion.service';
import { AccountService } from '../../../../backend/services/accounts.service';
import { CustomerService } from '../../../../backend/services/customer.service';
import { RequestParams } from '../../../../backend/classes/request-params.class';
import { GeoData } from '../../../../backend/classes/geodata.class';
import { PaymentsService } from '../../../../backend/services/payments.service';
import { Conversion } from '../../../../backend/classes/conversion.class';
import { PromisificationService } from './../../../../common/services/promisification.service';

@Component({
    templateUrl: './dashboard.component.pug'
})
export class DashboardComponent implements OnInit {

    public fromTime: any;
    public toTime: any;
    public uniqueCount: any;
    public successfulCount: any;
    public unfinishedCount: any;
    public profit: any;
    public account: any = {
        general: {
            ownAmount: 1
        },
        guarantee: {
            ownAmount: 2
        }
    };
    public chartFromTime: any;
    public revenueChartData: any;
    public conversionChartData: any;
    public geoChartData: GeoData[] = [];
    public paymentMethodChartData: any;
    public isInfoPanelLoading: boolean;

    private fromTimeDate: Date;
    private toTimeDate: Date;
    private shopID: string;
    private infoPanelRequests: Promise<any>[] = [];

    constructor(private route: ActivatedRoute,
                private customer: CustomerService,
                private payments: PaymentsService,
                private accounts: AccountService,
                private promisificator: PromisificationService) { }

    public ngOnInit() {
        this.route.parent.params.subscribe((params: Params) => {
            this.shopID = params['shopID'];
            this.setInitialDate();
            this.loadData();
        });
    }

    private loadRate(promisesArray: Array<any>) {
        let currentPromise: Promise<any>;

        currentPromise = this.customer.getRate(
            this.shopID,
            new RequestParams(
                this.fromTime,
                this.toTime
            )
        );

        if (promisesArray) {
            promisesArray.push(currentPromise);
        }

        currentPromise.then(
            (rateStat: any) => {
                this.uniqueCount = rateStat[0] ? rateStat[0].uniqueCount : 0;
            }
        );
    }

    private loadPaymentMethod() {
        this.customer.getPaymentMethod(
            this.shopID,
            new RequestParams(
                this.fromTime,
                this.toTime,
                'minute',
                '1',
                'bank_card'
            )
        ).then(
            (paymentMethodState: any) => {
                this.paymentMethodChartData = ChartDataConversionService.toPaymentMethodChartData(paymentMethodState);
            }
        );
    }

    private loadConversionStat(promisesArray: Array<any>) {
        let currentPromise: Promise<any>;

        currentPromise = this.payments.getConversionStat(
            this.shopID,
            new RequestParams(
                this.fromTime,
                this.toTime,
                'minute',
                '1'
            )
        );

        if (promisesArray) {
            promisesArray.push(currentPromise);
        }

        currentPromise.then(
            (conversionStat: Conversion[]) => {
                let paymentCountInfo: any;

                paymentCountInfo = ChartDataConversionService.toPaymentCountInfo(conversionStat);

                this.conversionChartData = ChartDataConversionService.toConversionChartData(conversionStat);
                this.successfulCount = paymentCountInfo.successfulCount;
                this.unfinishedCount = paymentCountInfo.unfinishedCount;
            }
        );
    }

    private loadGeoChartData() {
        this.payments.getGeoChartData(
            this.shopID,
            new RequestParams(
                this.fromTime,
                this.toTime,
                'day',
                '1'
            )
        ).then(
            (geoData: GeoData[]) => {
                this.geoChartData = ChartDataConversionService.toGeoChartData(geoData);
            }
        );
    }

    private loadRevenueStat(promisesArray: Array<any>) {
        let currentPromise: Promise<any>;

        currentPromise = this.payments.getRevenueStat(
            this.shopID,
            new RequestParams(
                this.fromTime,
                this.toTime,
                'minute',
                '1'
            )
        );

        if (promisesArray) {
            promisesArray.push(currentPromise);
        }

        currentPromise.then(
            (revenueStat: any) => {
                this.revenueChartData = ChartDataConversionService.toRevenueChartData(revenueStat);
                this.profit = ChartDataConversionService.toTotalProfit(revenueStat);
            }
        );
    }

    private loadShopAccounts(promisesArray: Array<any>) {
        let currentPromise: Promise<any>;

        currentPromise = this.accounts.getShopAccounts(this.shopID);

        if (promisesArray) {
            promisesArray.push(currentPromise);
        }

        currentPromise.then(
            (shopAccounts) => {
                if (shopAccounts.length > 1) {
                    console.warn('shop accounts size > 1');
                }
                _.forEach(shopAccounts, item => {
                    this.accounts.getShopAccountDetails(
                        this.shopID,
                        item.generalID
                    ).then(
                        (generalAccount: any) => {
                            this.account.general = generalAccount;
                        }
                    );

                    this.accounts.getShopAccountDetails(
                        this.shopID,
                        item.guaranteeID
                    ).then(
                        (guaranteeAccount: any) => {
                            this.account.guarantee = guaranteeAccount;
                        }
                    );
                });
            }
        );
    }

    private loadData() {
        this.fromTime = moment(this.fromTimeDate).utc().format();
        this.toTime = moment(this.toTimeDate).utc().format();

        this.chartFromTime = this.fromTime;

        this.promisificator.handleAsyncOperations(
            () => {
                this.isInfoPanelLoading = true;
                this.infoPanelRequests = [];
            },
            this.infoPanelRequests,
            [
                this.loadRate,
                this.loadPaymentMethod,
                this.loadConversionStat,
                this.loadGeoChartData,
                this.loadRevenueStat,
                this.loadShopAccounts
            ],
            () => {
                this.isInfoPanelLoading = false;
            },
            this
        );
    }

    private setInitialDate() {
        this.toTimeDate = new Date();
        this.fromTimeDate = new Date();
        this.fromTimeDate.setMonth( this.fromTimeDate.getMonth() - 1 );
    }
}

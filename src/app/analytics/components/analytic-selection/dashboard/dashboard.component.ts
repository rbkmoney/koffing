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

    private fromTimeDate: Date;
    private toTimeDate: Date;
    private shopID: string;

    constructor(private route: ActivatedRoute,
                private customer: CustomerService,
                private payments: PaymentsService,
                private accounts: AccountService) { }

    public ngOnInit() {
        this.route.parent.params.subscribe((params: Params) => {
            this.shopID = params['shopID'];
            this.setInitialDate();
            this.loadData();
        });
    }

    private loadData(): void {
        this.fromTime = moment(this.fromTimeDate).utc().format();
        this.toTime = moment(this.toTimeDate).utc().format();

        this.chartFromTime = this.fromTime;

        this.customer.getRate(
            this.shopID,
            new RequestParams(
                this.fromTime,
                this.toTime
            )
        ).then(
            (rateStat: any) => {
                this.uniqueCount = rateStat[0] ? rateStat[0].uniqueCount : 0;
            }
        );

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
            });

        this.payments.getConversionStat(
            this.shopID,
            new RequestParams(
                this.fromTime,
                this.toTime,
                'minute',
                '1'
            )
        ).then(
            (conversionStat: Conversion[]) => {
                let paymentCountInfo: any;

                paymentCountInfo = ChartDataConversionService.toPaymentCountInfo(conversionStat);

                this.conversionChartData = ChartDataConversionService.toConversionChartData(conversionStat);
                this.successfulCount = paymentCountInfo.successfulCount;
                this.unfinishedCount = paymentCountInfo.unfinishedCount;
            }
        );

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

        this.payments.getRevenueStat(
            this.shopID,
            new RequestParams(
                this.fromTime,
                this.toTime,
                'minute',
                '1'
            )
        ).then(
            (revenueStat) => {
                this.revenueChartData = ChartDataConversionService.toRevenueChartData(revenueStat);
                this.profit = ChartDataConversionService.toTotalProfit(revenueStat);
            }
        );

        this.accounts.getShopAccounts(this.shopID).then(
            (shopAccounts) => {
                if (shopAccounts.length > 1) {
                    console.warn('shop accounts size > 1');
                }
                _.forEach(shopAccounts, item => {
                    this.accounts.getShopAccountDetails(
                        this.shopID,
                        item.generalID
                    ).then(
                        (generalAccount) => {
                            this.account.general = generalAccount;
                        }
                    );

                    this.accounts.getShopAccountDetails(
                        this.shopID,
                        item.guaranteeID
                    ).then(
                        (guaranteeAccount) => {
                            this.account.guarantee = guaranteeAccount;
                        }
                    );
                });
            }
        );
    }

    private setInitialDate() {
        this.toTimeDate = new Date();
        this.fromTimeDate = new Date();
        this.fromTimeDate.setMonth( this.fromTimeDate.getMonth() - 1 );
    }
}

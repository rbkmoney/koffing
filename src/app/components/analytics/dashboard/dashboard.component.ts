import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from '../../../services/customers/customer.service';
import RequestParams from '../../../services/RequestParams';
import {ChartDataConversionService} from './chart-data-conversion.service';
import {PaymentsService} from './../../../services/payments/payments.service';
import {GeoData} from './../../../services/payments/geodata';
import {AccountService} from './../../../services/accounts/accounts.service';
import { Conversion } from './../../../services/payments/conversion';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    templateUrl: './dashboard.component.pug'
})
export class DashboardComponent implements OnInit {

    private fromTimeDate: Date;
    private toTimeDate: Date;

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

    private shopID: string;
    public paymentMethodChartData: any;

    constructor(private route: ActivatedRoute,
                private customer: CustomerService,
                private payments: PaymentsService,
                private accounts: AccountService) { }

    loadData(): void {
        this.fromTime = moment(this.fromTimeDate).format('YYYY-MM-DD');
        this.toTime = moment(this.toTimeDate).format('YYYY-MM-DD');

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
                            this.account.general = generalAccount
                        }
                    );

                    this.accounts.getShopAccountDetails(
                        this.shopID,
                        item.guaranteeID
                    ).then(
                        (guaranteeAccount) => {
                            this.account.guarantee = guaranteeAccount
                        }
                    );
                });
            }
        );
    }

    setInitialDate() {
        this.toTimeDate = new Date();
        this.fromTimeDate = new Date();
        this.fromTimeDate.setMonth( this.fromTimeDate.getMonth() - 1 );
    }

    ngOnInit() {
        this.shopID = this.route.parent.snapshot.params['shopID'];

        this.setInitialDate();

        this.loadData();
    }
}

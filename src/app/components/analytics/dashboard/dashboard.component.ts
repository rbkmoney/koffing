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
                private accounts: AccountService) {
        this.toTime = moment().format();
        this.fromTime = moment(this.toTime).subtract(1, 'M').hours(0).minutes(0).seconds(0).milliseconds(0).format();
    }

    get pickerFromTime(): any {
        return moment(this.fromTime).format('YYYY-MM-DD');
    }

    set pickerFromTime(value: any) {
        this.fromTime = moment(value).format();
    }

    get pickerToTime(): any {
        return moment(this.toTime).format('YYYY-MM-DD');
    }

    set pickerToTime(value: any) {
        this.toTime = moment(value).format();
    }

    loadData(): void {
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

    ngOnInit() {
        this.shopID = this.route.parent.snapshot.params['shopID'];

        this.loadData();
    }
}

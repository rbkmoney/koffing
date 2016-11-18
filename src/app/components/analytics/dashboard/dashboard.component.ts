import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import {CustomerService} from '../../../services/customers/customer.service';
import PaymentMethodRequest from '../../../services/customers/PaymentMethodRequest';
import {ChartDataConversionService} from './chart-data-conversion.service';
import {PaymentsService} from './../../../services/payments/payments.service';
import {GeoData} from './../../../services/payments/geodata';

@Component({
    templateUrl: './dashboard.component.pug'
})
export class DashboardComponent implements OnInit {

    public fromTime = 1;
    public toTime = 2;
    public uniqueCount = 3;
    public successfulCount = 4;
    public unfinishedCount = 5;
    public profit = 6;
    public account = {
        general: {
            ownAmount: 1
        },
        guarantee: {
            ownAmount: 2
        }
    };
    public chartFromTime = 8;
    public revenueChartData = 9;
    public conversionChartData = 10;
    public geoChartData: GeoData[] = [];

    private shopID: string;
    public paymentMethodChartData: any;

    constructor(private route: ActivatedRoute,
                private customer: CustomerService,
                private payments: PaymentsService) {}

    ngOnInit() {
        this.shopID = this.route.parent.snapshot.params['shopID'];
        const paymentMethodRequest = new PaymentMethodRequest('1', '2');

        this.customer.paymentMethod(this.shopID, paymentMethodRequest).then(
            (paymentMethodState: any) => {
                this.paymentMethodChartData = ChartDataConversionService.toPaymentMethodChartData(paymentMethodState);
        });

        this.payments.getGeoChartData(this.shopID).then(
            (geoData) => {
                this.geoChartData = ChartDataConversionService.toGeoChartData(geoData);
            }
        );

        this.payments.getRevenueStat(this.shopID).then(
            (revenueStat) => {
                this.revenueChartData = ChartDataConversionService.toRevenueChartData(revenueStat);
                this.profit = ChartDataConversionService.toTotalProfit(revenueStat);
            }
        );
    }
}

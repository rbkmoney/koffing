import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import {CustomerService} from '../../../services/customers/customer.service';
import PaymentMethodRequest from '../../../services/customers/PaymentMethodRequest';
import {ChartDataConversionService} from './chart-data-conversion.service';

@Component({
    templateUrl: 'dashboard.component.pug'
})
export class DashboardComponent implements OnInit {

    private shopID: string;
    public paymentMethodChartData: any;

    constructor(private route: ActivatedRoute,
                private customer: CustomerService) {}

    ngOnInit() {
        this.shopID = this.route.parent.snapshot.params['shopID'];
        const paymentMethodRequest = new PaymentMethodRequest('1', '2');
        this.customer.paymentMethod(this.shopID, paymentMethodRequest).then((paymentMethodState: any) => {
            this.paymentMethodChartData = ChartDataConversionService.toPaymentMethodChartData(paymentMethodState);
        });
    }
}

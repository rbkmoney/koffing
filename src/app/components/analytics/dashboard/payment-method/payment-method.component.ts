import {Component, Input, OnChanges} from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'payment-method',
    templateUrl: './payment-method.component.pug'
})
export class PaymentMethodComponent implements OnChanges {

    @Input()
    public chartData: any;

    public labels: string[] | any[];
    public data: number[] = [];
    public type: string = 'doughnut';
    public options: any = {
        animation: false
    };

    ngOnChanges() {
        let grouped: any;
        let paymentSystem: any;
        let data: any[];

        if (this.chartData) {

            grouped = _.groupBy(this.chartData, 'paymentSystem');
            paymentSystem = _.keys(grouped);
            data = [];

            _.forEach(paymentSystem, system => data.push(
                _.chain(grouped[system])
                    .reduce(
                        (acc: any, item: any) => acc + item.totalCount, 0
                    )
                    .value()
            ));

            this.labels = _.map(paymentSystem, system => {
                let result = system;

                if (system === 'visa') {
                    result = 'Visa';
                } else if (system === 'mastercard') {
                    result = 'Master Card';
                } else if (system === 'nspkmir') {
                    result = 'Mir'
                }

                return result;
            });

            this.data = data;

        }
    }
}
import {Component, Input, OnChanges} from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'payment-method',
    templateUrl: './payment-method.component.pug'
})
export class PaymentMethodComponent implements OnChanges {

    @Input()
    public chartData: any;

    public labels: string[];
    public data: number[] = [];
    public type: string = 'pie';
    public options: any = {
        animation: false
    };

    ngOnChanges() {
        if (this.chartData) {
            const grouped = _.groupBy(this.chartData, 'paymentSystem');
            const paymentSystem = _.keys(grouped);
            const data: any = [];
            _.forEach(paymentSystem, system => data.push(
                _.chain(grouped[system])
                    .reduce((acc, item) => acc + item.totalCount, 0)
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
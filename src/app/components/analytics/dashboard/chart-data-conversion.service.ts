import * as _ from 'lodash';

export class ChartDataConversionService {

    public static toPaymentMethodChartData(paymentMethodStat: any): any {
        return _.map(paymentMethodStat, item => {
            return {
                totalCount: item.totalCount,
                paymentSystem: item.paymentSystem
            }
        });
    }
}
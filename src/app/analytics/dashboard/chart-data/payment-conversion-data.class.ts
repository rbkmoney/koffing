import { PaymentCount } from 'koffing/analytics/dashboard/chart-data/payment-count.class';
import { LineChartData } from 'koffing/analytics/dashboard/chart-data/line-chart-data';

export class PaymentConversionData {
    public paymentCount: PaymentCount;
    public conversionChartData: LineChartData;

    constructor(paymentCount: PaymentCount, conversionChartData: LineChartData) {
        this.paymentCount = paymentCount;
        this.conversionChartData = conversionChartData;
    }
}

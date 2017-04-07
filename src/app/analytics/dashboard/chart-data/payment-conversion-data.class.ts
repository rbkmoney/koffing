import { ConversionChartData } from './conversion-chart-data.class';
import { PaymentCount } from 'koffing/analytics/dashboard/chart-data/payment-count.class';

export class PaymentConversionData {
    public paymentCount: PaymentCount;
    public conversionChartData: ConversionChartData[];

    constructor(paymentCount: PaymentCount, conversionChartData: ConversionChartData[]) {
        this.paymentCount = paymentCount;
        this.conversionChartData = conversionChartData;
    }
}

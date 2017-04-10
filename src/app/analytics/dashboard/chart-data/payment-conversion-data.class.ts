import { PaymentCount } from 'koffing/analytics/dashboard/chart-data/payment-count.class';
import { LineChartData } from 'koffing/analytics/dashboard/chart-data/line-chart-data';

export interface PaymentConversionData {
    paymentCount: PaymentCount;
    conversionChartData: LineChartData;
}

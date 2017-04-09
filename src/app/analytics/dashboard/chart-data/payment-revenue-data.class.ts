import { LineChartData } from 'koffing/analytics/dashboard/chart-data/line-chart-data';

export class PaymentRevenueData {
    public profit: number;
    public revenueChartData: LineChartData;

    constructor(profit: number, revenueChartData: LineChartData) {
        this.profit = profit;
        this.revenueChartData = revenueChartData;
    }
}

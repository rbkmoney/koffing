import { RevenueChartData } from 'koffing/analytics/dashboard/chart-data/revenue-chart-data.class';

export class PaymentRevenueData {
    public profit: number;
    public revenueChartData: RevenueChartData[];

    constructor(profit: number, revenueChartData: RevenueChartData[]) {
        this.profit = profit;
        this.revenueChartData = revenueChartData;
    }
}

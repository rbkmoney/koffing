import { Dataset } from 'koffing/analytics/dashboard/chart-data/dataset';

export interface LineChartData {
    labels: string[];
    datasets: Dataset[];
}

import { Dictionary, groupBy, keys, round } from 'lodash';
import * as moment from 'moment';

import { PaymentGeoStat } from 'koffing/backend/model/payment-geo-stat.class';
import { PaymentMethodStat } from 'koffing/backend/model/payment-method-stat.class';
import { PaymentConversionStat } from 'koffing/backend/model/payment-conversion-stat.class';
import { PaymentRevenueStat } from 'koffing/backend/model/payment-revenue-stat.class';
import { PaymentMethodChartData } from './payment-method-chart-data.class';
import { PaymentCount } from './payment-count.class';
import { PaymentGeoChartData } from './payment-geo-chart-data.class';
import { RevenueChartData } from './revenue-chart-data.class';
import { LineChartData } from './line-chart-data';
import { Dataset } from 'koffing/analytics/dashboard/chart-data/dataset';

export class ChartDataConverter {

    public static toPaymentMethodChartData(paymentMethodStats: PaymentMethodStat[]): PaymentMethodChartData[] {
        return paymentMethodStats.map((item) => new PaymentMethodChartData(item.totalCount, item.paymentSystem));
    }

    public static toRevenueChartData(paymentRevenueStat: PaymentRevenueStat[]): RevenueChartData[] {
        return paymentRevenueStat.map((item) => new RevenueChartData(item.profit, item.offset));
    }

    public static toTotalProfit(paymentRevenueStat: PaymentRevenueStat[]): number {
        return paymentRevenueStat.reduce((acc: any, item: any) => acc + item.profit, 0);
    }

    public static toGeoChartData(paymentGeoStat: PaymentGeoStat[]): PaymentGeoChartData {
        const grouped: Dictionary<PaymentGeoStat[]> = groupBy(paymentGeoStat, 'geoID');
        const geoIDs: string[] = keys(grouped);
        const data: number[] = [];
        geoIDs.forEach(geoID => {
            const accumulatedValue = grouped[geoID].reduce((acc, item) => acc + item.profit, 0);
            data.push(accumulatedValue / 100);
        });
        return new PaymentGeoChartData(geoIDs, data);
    }

    public static toPaymentCountInfo(paymentConversionStat: PaymentConversionStat[]): PaymentCount {
        return paymentConversionStat.reduce((acc, item) => {
            return {
                successfulCount: acc.successfulCount + item.successfulCount,
                unfinishedCount: acc.unfinishedCount + (item.totalCount - item.successfulCount)
            };
        }, {successfulCount: 0, unfinishedCount: 0});
    }

    public static toConversionChartData(from: Date, stat: PaymentConversionStat[]): LineChartData {
        const labels = stat.map((item) => moment(from).add(item.offset, 's').format('DD.MM HH:mm'));
        const datasets: Dataset[] = [{
            label: 'Конверсия',
            data: stat.map((item) => round(item.conversion * 100, 0))
        }];
        return {labels, datasets};
    }
}

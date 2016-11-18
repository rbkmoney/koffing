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

    public static toRevenueChartData(revenueStat: any): any {
        return _.map(revenueStat, item => {
            return {
                profit: item.profit,
                offset: item.offset
            }
        });
    }

    public static toGeoChartData(geoStat: any): any {
        return _.map(geoStat, item => {
            return {
                cityName: item.cityName,
                profit: item.profit
            }
        });
    }

    public static toTotalProfit(revenueStat: any): any {
        return _.reduce(revenueStat, (acc, item) => acc + item.profit, 0);
    }
}
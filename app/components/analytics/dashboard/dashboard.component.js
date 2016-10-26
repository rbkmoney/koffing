dashboard.component('dashboard', {
    templateUrl: 'components/analytics/dashboard/dashboard.template.html',
    controller: function (Payments, ChartDataConversion, Customers, Accounts, modalMsg) {
        // this.fromTime = moment(this.toTime).subtract(1, 'M').hours(0).minutes(0).seconds(0).milliseconds(0).format();
        this.toTime = moment().format();
        this.fromTime = moment().hours(0).minutes(0).seconds(0).format();

        this.loadData = () => {
            this.chartFromTime = this.fromTime;

            const customers = new Customers(this.shopID);
            customers.rate({
                fromTime: this.fromTime,
                toTime: this.toTime
            }, rateStat => {
                this.uniqueCount = rateStat[0] ? rateStat[0].uniqueCount : 0;
            }, error => {
                modalMsg.open([
                    'Error code: ' + error.status,
                    'Url: ' + error.config.url,
                    'Method: ' + error.config.method,
                    'JS-component: dashboard'
                ], 'Ошибка http-запроса');
            });

            customers.paymentMethod({
                fromTime: this.fromTime,
                toTime: this.toTime,
                splitUnit: 'minute',
                splitSize: 1,
                paymentMethod: 'bank_card'
            }, paymentMethodStat => {
                this.paymentMethodChartData = ChartDataConversion.toPaymentMethodChartData(paymentMethodStat);
            }, error => {
                modalMsg.open([
                    'Error code: ' + error.status,
                    'Url: ' + error.config.url,
                    'Method: ' + error.config.method,
                    'JS-component: dashboard'
                ], 'Ошибка http-запроса');
            });

            const payments = new Payments(this.shopID);
            payments.conversion({
                fromTime: this.fromTime,
                toTime: this.toTime,
                splitUnit: 'minute',
                splitSize: 1
            }, conversionStat => {
                this.conversionChartData = ChartDataConversion.toConversionChartData(conversionStat);
                const paymentCountInfo = ChartDataConversion.toPaymentCountInfo(conversionStat);
                this.successfulCount = paymentCountInfo.successfulCount;
                this.unfinishedCount = paymentCountInfo.unfinishedCount;
            }, error => {
                modalMsg.open([
                    'Error code: ' + error.status,
                    'Url: ' + error.config.url,
                    'Method: ' + error.config.method,
                    'JS-component: dashboard'
                ], 'Ошибка http-запроса');
            });

            payments.revenue({
                fromTime: this.fromTime,
                toTime: this.toTime,
                splitUnit: 'minute',
                splitSize: 1
            }, revenueStat => {
                this.revenueChartData = ChartDataConversion.toRevenueChartData(revenueStat);
                this.profit = ChartDataConversion.toTotalProfit(revenueStat);
            }, error => {
                modalMsg.open([
                    'Error code: ' + error.status,
                    'Url: ' + error.config.url,
                    'Method: ' + error.config.method,
                    'JS-component: dashboard'
                ], 'Ошибка http-запроса');
            });

            payments.geo({
                fromTime: this.fromTime,
                toTime: this.toTime,
                splitUnit: 'day',
                splitSize: 1
            }, geoStat => {
                this.geoChartData = ChartDataConversion.toGeoChartData(geoStat);
            }, error => {
                modalMsg.open([
                    'Error code: ' + error.status,
                    'Url: ' + error.config.url,
                    'Method: ' + error.config.method,
                    'JS-component: dashboard'
                ], 'Ошибка http-запроса');
            });

            Accounts.query({
                shopID: this.shopID
            }, shopAccounts => {
                if (shopAccounts.length > 1) {
                    console.warn('shop accounts size > 1');
                }
                _.forEach(shopAccounts, item => {
                    const account = {};
                    Accounts.get({
                        shopID: this.shopID,
                        accountID: item.generalID
                    }, generalAccount => {
                        account.general = generalAccount;
                    }, error => {
                        modalMsg.open([
                            'Error code: ' + error.status,
                            'Url: ' + error.config.url,
                            'Method: ' + error.config.method,
                            'JS-component: dashboard',
                        ], 'Ошибка http-запроса');
                    });

                    Accounts.get({
                        shopID: this.shopID,
                        accountID: item.guaranteeID
                    }, guaranteeAccount => {
                        account.guarantee = guaranteeAccount;
                    }, error => {
                        modalMsg.open([
                            'Error code: ' + error.status,
                            'Url: ' + error.config.url,
                            'Method: ' + error.config.method,
                            'JS-component: dashboard'
                        ], 'Ошибка http-запроса');
                    });
                    this.account = account;
                });
            }, error => {
                modalMsg.open([
                    'Error code: ' + error.status,
                    'Url: ' + error.config.url,
                    'Method: ' + error.config.method,
                    'JS-component: dashboard'
                ], 'Ошибка http-запроса');
            });
        };

        this.$routerOnActivate = route => {
            this.shopID = route.params.shopId;
            this.loadData();
        };
    }
});

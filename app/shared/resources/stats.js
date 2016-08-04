resources.factory('Stats', function ($resource, appConfig) {
    return $resource(appConfig.capiUrl + 'analytics/shops/:shopID/payments/stats/:statsType', {
        shopID: 1
    }, {
        /**
         * @typedef {Object} Parameters
         * @property {string} invoiceID
         * @property {dateTime} fromTime
         * @property {dateTime} toTime
         * @property {string} splitUnit
         * @property {int} splitSize
         */

        /**
         * @returns {Array.<PaymentRevenueStat>}
         */
        revenue: {method: 'GET', isArray: true, params: {statsType: 'revenue'}},

        /**
         * @typedef {Object} Parameters
         * @property {string} invoiceID
         * @property {dateTime} fromTime
         * @property {dateTime} toTime
         * @property {string} splitUnit
         * @property {int} splitSize
         */

        /**
         * @returns {Array.<PaymentConversionStat>}
         */
        conversion: {method: 'GET', isArray: true, params: {statsType: 'conversion'}},

        /**
         * @typedef {Object} Parameters
         * @property {string} invoiceID
         * @property {dateTime} fromTime
         * @property {dateTime} toTime
         * @property {string} splitUnit
         * @property {int} splitSize
         */

        /**
         * @returns {Array.<PaymentGeoStat>}
         */
        geo: {method: 'GET', isArray: true, params: {statsType: 'geo'}}
    });
});
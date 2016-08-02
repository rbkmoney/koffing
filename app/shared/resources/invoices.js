resources.factory('Invoices', function ($resource, URL) {
    return $resource(URL.capiUrl + 'analytics/shops/:shopID/invoices', {
        shopID: 1
    }, {
        /**
         * @typedef {Object} Parameters
         * @property {int} limit
         * @property {int} offset
         * @property {dateTime} fromTime
         * @property {dateTime} toTime
         * @property {string} status
         * @property {string} invoiceID
         */

        /**
         * @returns {Array.<Invoices>}
         */
        search: {method: 'GET', isArray: true}
    });
});
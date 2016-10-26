finance.component('finance', {
    templateUrl: 'components/analytics/finance/finance.html',
    controller: function (Invoices, modalMsg) {
        this.searchParams = {
            fromTime: moment().hours(0).minutes(0).seconds(0).format(),
            toTime: moment().format(),
            limit: 20,
            offset: 0
        };
        this.isLoading = false;
        this.isSearched = false;

        this.$routerOnActivate = route => {
            const shopID = route.params.shopId;

            this.search = (offset = 0) => {
                this.isLoading = true;
                this.isSearched = true;
                this.searchParams.offset = offset;
                if (_.isEmpty(this.searchParams.invoiceID)) {
                    this.searchParams.invoiceID = null;
                }
                const invoices = new Invoices(shopID);
                invoices.search(this.searchParams, result => {
                    this.searchedInvoices = result.invoices;
                    this.totalCount = result.totalCount;
                    this.isLoading = false;
                }, error => {
                    modalMsg.open([
                        'Error code: ' + error.status,
                        'Url: ' + error.config.url,
                        'Method: ' + error.config.method,
                        'JS-component: finance'
                    ], 'Ошибка http-запроса');
                });
            };

            this.search();
        };
    }
});

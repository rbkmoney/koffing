dashboard.component('analytics', {
    templateUrl: 'components/analytics/analytics.template.html',
    $routeConfig: [
        {path: '/:shopId/statistic', name: 'Dashboard', component: 'dashboard'},
        {path: '/:shopId/finance', name: 'Finance', component: 'finance'}
    ],
    bindings: {
        $router: '<'
    },
    controller: function (Parties, $location, modalMsg) {
        this.$routerOnActivate = () => {
            Parties.get(party => {
                this.isShopsExists = !!party.shops.length;
                if (!this.isShopsExists) {
                    return;
                }
                this.shopsDetails = _.map(party.shops, shop => ({
                    name: shop.shopDetails.name,
                    key: shop.shopID
                }));
                this.selectedShopId = resolveShopId(party.shops);
                this.onSelect();
            }, error => {
                modalMsg.open([
                    'Error code: ' + error.status,
                    'Url: ' + error.config.url,
                    'Method: ' + error.config.method,
                    'JS-component: analytics'
                ], 'Ошибка http-запроса');
            });
        };

        function findParam(path, marker) {
            const res = _.chain(path)
                .split('/')
                .reduce((a, c) => ((c === marker || a === marker) ? c : a), '')
                .value();
            return res !== marker ? res : null;
        }

        function resolveShopId(shops) {
            const path = $location.path();
            return shops.length > 0 ? shops[0].shopID : findParam(path, 'analytics');
        }

        this.onSelect = () => {
            this.$router.navigate(['Dashboard', {shopId: this.selectedShopId}]);
        };

        this.isRouteActive = route => this.$router.isRouteActive(this.$router.generate(route));
    }
});

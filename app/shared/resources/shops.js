resources.factory('Shops', function ($resource, appConfig) {
    return $resource(`${appConfig.capiUrl}/processing/shops/:shopID/:action`, {
        shopID: '@shopID'
    }, {
        activate: {
            method: 'PUT', params: {action: 'activate'}, headers: {'Content-Type': 'application/json; charset=utf-8'}
        }
    });
});

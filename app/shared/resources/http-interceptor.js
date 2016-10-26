resources.factory('httpInterceptor', function($injector) {
    return {
        responseError: function(error) {
            if (error.config) {
                const modalMsg = $injector.get('modalMsg');
                modalMsg.open([
                    'Error code: ' + error.status,
                    'Url: ' + error.config.url,
                    'Method: ' + error.config.method,
                ], 'Ошибка http-запроса');
            }
            return error;
        }
    };
});

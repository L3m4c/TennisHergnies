(function() {
    'use strict';

    angular
        .module('temp')
        .factory('AuthInterceptor', AuthInterceptor);

    /** @ngInject */
    function AuthInterceptor(apiurl) {
        var apiHost = apiurl;

        var service = {
            apiHost: apiHost,
            request: addToken
        };

        return service;

        function addToken(config) {
            var token = "Basic dGVzdDp0ZXN0";
            config.headers = config.headers || {};
            config.headers.Authorization = token;
            return config;
        }
    }
})();

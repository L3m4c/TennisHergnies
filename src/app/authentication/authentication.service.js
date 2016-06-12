(function() {
    'use strict';

    angular
        .module('temp')
        .factory('AuthInterceptor', AuthInterceptor);

    /** @ngInject */
    function AuthInterceptor($cookies, apiurl) {
        var apiHost = apiurl;

        var service = {
            apiHost: apiHost,
            request: addToken
        };

        return service;

        function addToken(config) {
            var token = $cookies.get("token");
            config.headers = config.headers || {};
            if (token != null || token != undefined || token != "") {
                config.headers.Authorization = token;
            } else {
                config.headers.Authorization = null;
            }
            return config;
        }
    }
})();

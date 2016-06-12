(function () {
    'use strict';

    angular
        .module('temp')
        .service('loginService', loginService);

    /** @ngInject */
    function loginService($log, $http, $cookies, $base64, $state, apiurl) {
        var service = {
            apiHost: apiurl,
            login: login,
            logout: logout,
            getLoggedUser: getLoggedUser
        };

        return service;

        function login(email, password) {
            var userDto = {};
            userDto.email = email;
            userDto.password = password;
            return $http.post(apiurl + 'login', userDto)
                .then(loginComplete)
                .catch(loginFailed);

            function loginComplete(response) {
                var token = email + ':' + password;
                var hash = $base64.encode(token);

                $cookies.put("token", "Basic " + hash);
                $cookies.put("currentUser", angular.toJson(response.data));
                return response.data;
            }

            function loginFailed(error) {
                $log.error('XHR Failed for getReservations.\n' + angular.toJson(error.data, true));
            }
        }

        function logout() {
            $cookies.remove("token");
            $cookies.remove("currentUser");
            $state.go("login");
        }

        function getLoggedUser() {
            if ($cookies.get("token") != null) {
                return angular.fromJson($cookies.get("currentUser"));
            }
        }
    }
})();

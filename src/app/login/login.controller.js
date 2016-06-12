(function () {
    'use strict';

    angular
        .module('temp')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController($cookies, $state) {
        if($cookies.get("token") != null && $cookies.get("token") != undefined && $cookies.get("token") != "") {
            $state.go("reservation");
        }
    }
})();

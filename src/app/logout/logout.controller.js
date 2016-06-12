(function () {
    'use strict';

    angular
        .module('temp')
        .controller('LogoutController', LogoutController);

    /** @ngInject */
    function LogoutController(loginService) {
        loginService.logout();
    }
})();

(function () {
    'use strict';

    angular
        .module('temp')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log, $rootScope, $state, $cookies) {

        $log.debug('runBlock end');

        $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {

                var isLogin = toState.name === "login";
                if (isLogin) {
                    return; // no need to redirect
                }

                // now, redirect only not authenticated

                var userInfo = $cookies.get("token");

                if (userInfo === null || userInfo === undefined || userInfo === "") {
                    e.preventDefault(); // stop current execution
                    $state.go('login'); // go to login
                }
            });
        }
})();

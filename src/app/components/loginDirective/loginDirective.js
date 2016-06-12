(function() {
    'use strict';

    angular
        .module('temp')
        .directive('login', login);

    /** @ngInject */
    function login() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/loginDirective/loginDirective.html',
            scope: {
            },
            controller: loginController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function loginController(loginService, $state) {
            var vm = this;
            vm.email = "test@test.test";
            vm.password = "test";

            vm.login = function() {
                loginService.login(vm.email, vm.password).then(function(response) {
                    $state.go("reservation");
                });
            };
        }


    }

})();

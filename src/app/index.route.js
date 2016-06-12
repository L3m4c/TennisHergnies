(function () {
    'use strict';

    angular
        .module('temp')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
                url: '/home',
                templateUrl: 'app/main/main.html',
                controller: 'MainController',
                controllerAs: 'main'
            });

        $stateProvider.state('reservation', {
            url: '/reservation',
            templateUrl: 'app/reservation/reservation.html',
            controller: 'ReservationController',
            controllerAs: 'vm'
        });

        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'app/login/login.html',
            controller: 'LoginController',
            controllerAs: 'vm'
        });

        $stateProvider.state('logout', {
            url: '/logout',
            controller: 'LogoutController',
            controllerAs: 'vm'
        });

        $urlRouterProvider.otherwise('/login');
    }

})();

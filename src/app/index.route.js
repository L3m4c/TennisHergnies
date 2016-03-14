(function() {
  'use strict';

  angular
    .module('temp')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      });

    $stateProvider.state('reservation', {
        url: '/reservation',
        templateUrl: 'app/reservation/reservation.html',
        controller: 'ReservationController',
        controllerAs: 'reservation'
  });

    $urlRouterProvider.otherwise('/');
  }

})();

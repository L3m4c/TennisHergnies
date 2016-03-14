(function() {
  'use strict';

  angular
    .module('temp')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          states: '='
      }
    };

    return directive;


  }

})();

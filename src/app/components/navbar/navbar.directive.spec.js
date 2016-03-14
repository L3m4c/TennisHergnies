(function() {
  'use strict';

  /**
   * @todo Complete the test
   * This example is not perfect.
   * Test should check if MomentJS have been called
   */
  describe('directive navbar', function() {

    //var vm;
    var el;

    beforeEach(module('temp'));
    beforeEach(inject(function($compile, $rootScope) {

      el = angular.element("<acme-navbar states=\"{'Home': 'home', 'Reservation': 'reservation'}\"></acme-navbar>");

      $compile(el)($rootScope.$new());
      $rootScope.$digest();
      //vm = el.isolateScope().vm;
      // ctrl = el.controller('acmeNavbar');
    }));

    /*it('should be compiled', function() {
      expect(el.html()).not.toEqual(null);
    });

    it('should have isolate scope object with instanciate members', function() {
      expect(vm).toEqual(jasmine.any(Object));
    });*/
  });
})();

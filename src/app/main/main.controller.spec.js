(function() {
  'use strict';

  describe('main controller', function(){
    var vm;

    beforeEach(module('temp'));
    beforeEach(inject(function(_$controller_) {
      vm = _$controller_('MainController');
    }));

    it('should have a vm', function() {
      expect(vm).toEqual(jasmine.any(Object));
    });
  });
})();

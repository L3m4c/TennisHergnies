(function() {
    'use strict';

    describe('directive calendar', function() {
        var vm, el;

        beforeEach(module('temp'));
        beforeEach(inject(function($compile, $rootScope) {
            el = angular.element('<calendar></calendar>');

            $compile(el)($rootScope.$new());
            $rootScope.$digest();
            vm = el.isolateScope().vm;
            //ctrl = el.controller('CalendarController');
        }));

        it('should be compiled', function() {
            expect(el.html()).not.toEqual(null);
        });

        it('should have isolate scope object with instanciate members', function() {
            expect(vm).toEqual(jasmine.any(Object));
        });
    });
})();

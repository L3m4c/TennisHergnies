(function() {
    'use strict';

    angular
        .module('temp')
        .directive('ticketinformation', ticketInformation);

    /** @ngInject */
    function ticketInformation() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/ticketInformationDirective/ticketInformation.html',
            scope: {
                ticket: '=',
                editing: '='
            },
            controller: ticketInformationController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function ticketInformationController($scope, ticketInformationService) {
            var vm = this;
            vm.updateTicket = function() {
                ticketInformationService.updateInformationTicket(vm.id, vm.title, vm.content, 2).then(function(data) {
                    vm.ticket = data;
                });
            };
            vm.createTicket = function() {
                ticketInformationService.createInformationTicket(vm.title, vm.content, 2).then(function(data) {
                    vm.ticket = data;
                });
            };

            vm.onEditClick = function() {
                vm.editing=true;
            };
            vm.showEdit = function() {
                return !vm.editing;
            };
            vm.showSave = function() {
                return vm.editing && (vm.ticket !== null);
            };
            vm.showCreate = function() {
                return vm.editing && (vm.ticket===null);
            };
        }


    }

})();

(function() {
    'use strict';

    angular
        .module('temp')
        .directive('displayTicketInformations', displayTicketinformations);

    /** @ngInject */
    function displayTicketinformations() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/displayTicketInformationsDirective/displayTicketinformations.html',
            scope: {
                ticket: '='
            },
            controller: displayTicketInformationsController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function displayTicketInformationsController(ticketInformationService) {
            var vm = this;

            vm.tickets = [];

            ticketInformationService.getInformationsTickets().then(function(data) {
                data.forEach(function(ticketInfo) {
                    vm.tickets.push(ticketInfo);
                });
            });
        }


    }

})();

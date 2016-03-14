(function() {
    'use strict';

    angular
        .module('temp')
        .factory('ticketInformationService', ticketInformation);

    /** @ngInject */
    function ticketInformation($log, $http, apiurl) {
        var apiHost = apiurl;

        var service = {
            apiHost: apiHost,
            getInformationsTickets: getInformationsTickets,
            createInformationTicket: createInformationTicket,
            updateInformationTicket: updateInformationTicket
        };

        return service;

        function getInformationsTickets() {
            return $http.get(apiHost + 'tickets')
                .then(getInformationsTicketsComplete)
                .catch(getInformationsTicketsFailed);

            function getInformationsTicketsComplete(response) {
                return response.data;
            }

            function getInformationsTicketsFailed(error) {
                $log.error('XHR Failed for getInformationsTickets.\n' + angular.toJson(error.data, true));
            }
        }

        function createInformationTicket(title, content, authorId) {
            var data = {};
            data.title = title;
            data.content = content;
            data.authorId = authorId;
            return $http.post(apiHost + 'informationTicket', data)
                .then(updateInformationTicketComplete)
                .catch(updateInformationTicketsFailed);

            function updateInformationTicketComplete(response) {
                return response.data;
            }

            function updateInformationTicketsFailed(error) {
                $log.error('XHR Failed for create intfomationTicket.\n' + angular.toJson(error.data, true));
            }
        }

        function updateInformationTicket(id, title, content, authorId) {
            var data = {};
            data.id = id;
            data.title = title;
            data.content = content;
            data.authorId = authorId;
            return $http.put(apiHost + 'informationTicket', data)
                .then(updateInformationTicketComplete)
                .catch(updateInformationTicketsFailed);

            function updateInformationTicketComplete(response) {
                return response.data;
            }

            function updateInformationTicketsFailed(error) {
                $log.error('XHR Failed for update intfomationTicket.\n' + angular.toJson(error.data, true));
            }
        }
    }
})();

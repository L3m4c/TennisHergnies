(function () {
    'use strict';

    angular
        .module('temp')
        .service('reservation', reservation);

    /** @ngInject */
    function reservation($log, $http, toastr, moment, loginService) {
        var apiHost = 'http://localhost:8080/';

        var service = {
            apiHost: apiHost,
            getReservations: getReservations,
            createReservation: createReservation,
            updateReservation: updateReservation,
            deleteReservation: deleteReservation
        };

        return service;

        function getReservations() {
            return $http.get(apiHost + 'reservations')
                .then(getReservationsComplete)
                .catch(getReservationsFailed);

            function getReservationsComplete(response) {
                return response.data.map(function(event) {
                    event.startTime = moment(event.startTime);
                    event.endTime = moment(event.endTime);
                    return event;
                });
            }

            function getReservationsFailed(error) {
                $log.error('XHR Failed for getReservations.\n' + angular.toJson(error.data, true));
            }
        }

        function createReservation(startTime, endTime) {
            var reservation = {};
            reservation.id = null;
            reservation.startTime = moment(startTime).valueOf();
            reservation.endTime = moment(endTime).valueOf();
            reservation.user = loginService.getLoggedUser();
            return $http.post(apiHost + 'reservation', reservation)
                .then(createReservationsComplete)
                .catch(createReservationsFailed);

            function createReservationsComplete(response) {
                var event = response.data;
                event.startTime = moment(event.startTime);
                event.endTime = moment(event.endTime);
                return event;
            }

            function createReservationsFailed(error) {
                $log.error('XHR Failed for createReservation.\n' + angular.toJson(error.data, true));
            }
        }

        function updateReservation(id, startTime, endTime) {
            var reservation = {};
            reservation.id = id;
            reservation.startTime = moment(startTime).valueOf();
            reservation.endTime = moment(endTime).valueOf();
            reservation.user = loginService.getLoggedUser();
            return $http.put(apiHost + 'reservation', reservation)
                .then(updateReservationComplete)
                .catch(updateReservationFailed);

            function updateReservationComplete(response) {
                var event = response.data;
                event.startTime = moment(event.startTime);
                event.endTime = moment(event.endTime);
                return event;
            }

            function updateReservationFailed(error) {
                //$log.error('XHR Failed for updateReservation.\n' + angular.toJson(error.data, true));
                toastr.error(error.data.errorMessage, error.statusText);
            }
        }

        function deleteReservation(id) {
            return $http.delete(apiHost + 'reservation/' + id)
                .then(deleteReservationComplete)
                .catch(deleteReservationFailed);

            function deleteReservationComplete(response) {
                return response.data;
            }

            function deleteReservationFailed(error) {
                //$log.error('XHR Failed for deleteReservation.\n' + angular.toJson(error.data, true));
                toastr.error(error.data.errorMessage, error.statusText);
            }
        }
    }
})();

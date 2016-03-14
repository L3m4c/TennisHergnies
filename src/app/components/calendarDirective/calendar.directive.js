(function () {
    'use strict';

    angular
        .module('temp')
        .directive('calendar', calendar);

    /** @ngInject */
    function calendar() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/calendarDirective/calendar.html',
            scope: {
                events: '=',
                dayStart: '@',
                dayEnd: '@'
            },
            controller: CalendarController,
            controllerAs: 'vm'
        };

        return directive;

        /** @ngInject */
        function CalendarController(moment, eventsUtils, toastr, $scope, $log) {
            var vm = this;
            vm.calendarView = 'month';
            moment.locale('fr');
            vm.calendarDay = moment();
            vm.calendarTile = "Reservation du cours du tennis";
            vm.dayStart = $scope.dayStart;
            vm.dayEnd = $scope.dayEnd;
            vm.events = $scope.events;
            eventsUtils.setDayStart(vm.dayStart);
            eventsUtils.setDayEnd(vm.dayEnd);

            vm.cellModifier = function(calendarCell) {
                $log.log("cellModifier:" + JSON.stringify(calendarCell));
            }

            vm.eventClicked = function (calendarEvent) {
                toastr.info("\"" + calendarEvent.title + "\" clicked");
            }
            vm.eventTimesChanged = function (calendarEvent, calendarNewEventStart, calendarNewEventEnd) {
                toastr.info("event \"" + calendarEvent.title + "\" dragged or resized");
                vm.events = eventsUtils.updateEvent(vm.events, calendarEvent, calendarNewEventStart, calendarNewEventEnd);
            }
            vm.eventEdited = function (calendarEvent) {
                toastr.info("event \"" + calendarEvent.title + "\" edited");
                vm.events = eventsUtils.updateEvent(vm.events, calendarEvent);
            }
            vm.eventDeleted = function (calendarEvent) {
                toastr.info("event \"" + calendarEvent.title + "\" deleted");
                vm.events = eventsUtils.deleteEvent(vm.events, calendarEvent);
            }
            vm.timeSpanClickDispatcher = function (calendarDate) {
                if(vm.calendarView === 'month') {
                    //monthClick(calendarDate);
                } else if(vm.calendarView === 'day') {
                    hourClick(calendarDate);
                } else {
                    toastr.error("An error occur. Please contact administrator with code E001.");
                }
            }

            function hourClick(calendarDate) {
                toastr.info("hours clicked : " + calendarDate);
                vm.events = eventsUtils.createEvent(vm.events, calendarDate);
            }

            function monthClick(calendarDate) {
                toastr.info("month clicked : " + calendarDate);
                vm.calendarDay = calendarDate;
                vm.calendarView = 'day';
            }
        }
    }
})();

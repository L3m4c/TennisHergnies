(function () {
    'use strict';

    angular
        .module('temp')
        .service('eventsUtils', eventsUtils);

    /** @ngInject */
    function eventsUtils(moment, toastr) {
        var service = this;

        service._dayStart = '00:00';
        service._dayEnd = '23:00';
        service._maxEventDuration = '2';

        service.createEvent = function (events, newCalendarDate) {
            if(!rulesVerification(newCalendarDate, moment(newCalendarDate).add(service._maxEventDuration, 'h'))) {
                return events;
            }
            var event = {
                id: Math.floor(Math.random()*10000000),
                title: 'Leroy', // The title of the event
                type: 'special', // The type of the event (determines its color). Can be important, warning, info, inverse, success or special
                startsAt: newCalendarDate, // A javascript date object for when the event starts
                endsAt: moment(newCalendarDate).add(service._maxEventDuration, 'h'), // Optional - a javascript date object for when the event ends
                editable: true, // If edit-event-html is set and this field is explicitly set to false then dont make it editable.
                deletable: true, // If delete-event-html is set and this field is explicitly set to false then dont make it deleteable
                draggable: true, //Allow an event to be dragged and dropped
                resizable: true, //Allow an event to be resizable
                incrementsBadgeTotal: false, //If set to false then will not count towards the badge total amount on the month and year view
                recursOn: 'year', // If set the event will recur on the given period. Valid values are year or month
                cssClass: 'a-css-class-name' //A CSS class (or more, just separate with spaces) that will be added to the event when it is displayed on each view. Useful for marking an event as selected / active etc
            };
            events.push(event);
            return events;
        };
        service.updateEvent = function (events, calendarEvent, calendarNewEventStart, calendarNewEventEnd) {
            if(!rulesVerification(calendarNewEventStart, calendarNewEventEnd)) {
                return events;
            }
            return events.map(function(event) {
                if(event.id === calendarEvent.id) {
                    calendarEvent.startsAt = calendarNewEventStart;
                    calendarEvent.endsAt = calendarNewEventEnd;
                    return calendarEvent;
                } else {
                    return event;
                }
            });
        };
        service.deleteEvent = function (events, deletedEvent) {
            return events.filter(function(event) {
                if(event.id === deletedEvent.id) {
                    return false;
                } else {
                    return true;
                }
            });
        };
        service.setDayStart = function(hourAndMinute) {
            service._dayStart = hourAndMinute;
        };
        service.setDayEnd = function(hourAndMinute) {
            service._dayEnd = hourAndMinute;
        };
        function rulesVerification(calendarNewEventStart, calendarNewEventEnd) {
            if(verifyNewDateInRange(calendarNewEventStart, calendarNewEventEnd) &&
                    verifyNewEventDurationLessOrEqualMaxEventDuration(calendarNewEventStart, calendarNewEventEnd)) {
                return true;
            } else {
                return false;
            }
        }
        function verifyNewDateInRange(calendarNewEventStart, calendarNewEventEnd) {
            var start = moment(calendarNewEventStart);
            start.set('hour', getDayStart().format("HH"));
            start.set('minute', getDayStart().format("mm"));
            start.set('second', 0);
            start.set('millisecond', 0);
            start.subtract(1,'m');

            var end = moment(calendarNewEventStart);
            end.set('hour', getDayEndHour().format("HH"));
            end.set('minute', getDayEndHour().format("mm"));
            end.set('second', 0);
            end.set('millisecond', 0);
            end.add(1,'h');
            end.add(1,'m');

            if(moment(calendarNewEventStart).isAfter(start) && moment(calendarNewEventEnd).isBefore(end) ) {
                return true;
            } else {
                toastr.error("Date not in range "+service._dayStart+" to "+service._dayEnd);
                return false;
            }
        }

        function verifyNewEventDurationLessOrEqualMaxEventDuration(calendarNewEventStart, calendarNewEventEnd) {
            var durationStartPlusDurationMax = moment(calendarNewEventStart).add(service._maxEventDuration,'h');
            if(moment(calendarNewEventEnd).isAfter(durationStartPlusDurationMax)) {
                toastr.error("You can't book for more than "+service._maxEventDuration+" hours");
                return false;
            } else {
                return true;
            }
        }

        function getDayStart() {
            return moment(service._dayStart, "HH:mm");
        }
        function getDayEndHour() {
            return moment(service._dayEnd, "HH:mm");
        }
    }

})();

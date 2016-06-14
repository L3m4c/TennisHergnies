(function () {
    'use strict';

    angular
        .module('temp')
        .service('eventsUtils', eventsUtils);

    /** @ngInject */
    function eventsUtils(moment) {
        var service = this;

        service._dayStart = '00:00';
        service._dayEnd = '23:00';
        service._maxEventDuration = '2';

        service.createEvent = function (eventDto) {
                var event = {
                id: eventDto.id,
                title: eventDto.user.name + " " + eventDto.user.surname, // The title of the event
                type: 'special', // The type of the event (determines its color). Can be important, warning, info, inverse, success or special
                startsAt: eventDto.startTime, // A javascript date object for when the event starts
                endsAt: eventDto.endTime, // Optional - a javascript date object for when the event ends
                editable: true, // If edit-event-html is set and this field is explicitly set to false then dont make it editable.
                deletable: true, // If delete-event-html is set and this field is explicitly set to false then dont make it deleteable
                draggable: true, //Allow an event to be dragged and dropped
                resizable: true, //Allow an event to be resizable
                incrementsBadgeTotal: false, //If set to false then will not count towards the badge total amount on the month and year view
                cssClass: 'a-css-class-name', //A CSS class (or more, just separate with spaces) that will be added to the event when it is displayed on each view. Useful for marking an event as selected / active etc
                user: eventDto.user
            };
            return event;
        };

        service.updateEvent = function (events, eventDto) {
            return events.map(function(event) {
                if(event.id === eventDto.id) {
                    event.startsAt = eventDto.startTime;
                    event.endsAt = eventDto.endTime;
                    return event;
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

        function getDayStart() {
            return moment(service._dayStart, "HH:mm");
        }
        function getDayEndHour() {
            return moment(service._dayEnd, "HH:mm");
        }
    }

})();

(function() {
    'use strict';

    describe('service eventsUtils', function() {
        var eventsUtils, events = [], moment;

        beforeEach(module('temp'));
        beforeEach(inject(function(_eventsUtils_, _moment_) {
            eventsUtils = _eventsUtils_;
            moment = _moment_;
        }));
        beforeEach(function() {
            events = [
                {
                    id:0,
                    title: 'Leroy',
                    type: 'special',
                    startsAt: moment("2015-11-01 11:00", "YYYY-MM-DD HH:mm"),
                    endsAt: moment("2015-11-01 13:00", "YYYY-MM-DD HH:mm"),
                    editable: true,
                    deletable: true,
                    draggable: true,
                    resizable: true,
                    incrementsBadgeTotal: false,
                    recursOn: 'year',
                    cssClass: 'a-css-class-name'
                }];
        });

        it('should be registered', function() {
            expect(eventsUtils).not.toEqual(null);
        });

        it('should return a new events list with the new event', function() {
            events = eventsUtils.createEvent(events, new Date());
            expect(events.length).toEqual(2);
        });

        it('should return an updated event', function() {
            var newEvent = angular.copy(events[0]);
            var startAt = moment(new Date());
            var endAt = moment(new Date()).add(1,'h');
            events = eventsUtils.updateEvent(events, newEvent, startAt, endAt);
            expect(events.length).toEqual(1);
            expect(events[0].startsAt.timestamp).toEqual(startAt.timestamp);
            expect(events[0].startsAt.timestamp).toEqual(endAt.timestamp);
        });

        it('should return a deleted event', function () {
            events = eventsUtils.deleteEvent(events, events[0]);
            expect(events.length).toEqual(0);
        });
    });
})();

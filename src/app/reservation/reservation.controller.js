(function() {
  'use strict';

  angular
    .module('temp')
    .controller('ReservationController', ReservationController);

  /** @ngInject */
  function ReservationController(moment) {
    var vm = this;
    vm.events = [
        {
            id:0,
            title: 'Reservé', // The title of the event
            type: 'info', // The type of the event (determines its color). Can be important, warning, info, inverse, success or special
            startsAt: moment("2015-12-01 11:00", "YYYY-MM-DD HH:mm"), // A javascript date object for when the event starts
            endsAt: moment("2015-12-01 13:00", "YYYY-MM-DD HH:mm"), // Optional - a javascript date object for when the event ends
            editable: false, // If edit-event-html is set and this field is explicitly set to false then dont make it editable.
            deletable: false, // If delete-event-html is set and this field is explicitly set to false then dont make it deleteable
            draggable: false, //Allow an event to be dragged and dropped
            resizable: false, //Allow an event to be resizable
            incrementsBadgeTotal: false, //If set to false then will not count towards the badge total amount on the month and year view
            recursOn: 'year', // If set the event will recur on the given period. Valid values are year or month
            cssClass: 'a-css-class-name' //A CSS class (or more, just separate with spaces) that will be added to the event when it is displayed on each view. Useful for marking an event as selected / active etc
        }];
  }
})();

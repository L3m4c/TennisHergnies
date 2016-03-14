/* global malarkey:false, moment:false */
(function () {
    'use strict';

    angular
        .module('temp')
        .constant('malarkey', malarkey)
        .constant('moment', moment)
        .constant('apiurl', "http://localhost:8080/");

})();

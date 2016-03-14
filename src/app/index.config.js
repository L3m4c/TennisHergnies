(function () {
    'use strict';

    angular
        .module('temp')
        .config(config);

    /** @ngInject */
    function config($logProvider, $httpProvider, toastrConfig, calendarConfigProvider) {

        $httpProvider.interceptors.push('AuthInterceptor');
        // Enable log
        $logProvider.debugEnabled(true);

        // Set options third-party lib
        toastrConfig.allowHtml = true;
        toastrConfig.timeOut = 3000;
        toastrConfig.positionClass = 'toast-top-right';
        toastrConfig.preventDuplicates = true;
        toastrConfig.progressBar = true;

        calendarConfigProvider.setDateFormatter("moment");
        calendarConfigProvider.showTimesOnWeekView(true);

    }

})();

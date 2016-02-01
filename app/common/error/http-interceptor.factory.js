(function () {
    'use strict';

    angular
        .module('app')
        .factory('httpInterceptor', httpInterceptor);

    // If you throw something, you will always land in $exceptionHandler.
    // Callers will also catch it if they have a catch block.
    // If you reject a promise, only services with a catch block will receive it. They may throw it if
    // they want to pass it to $exceptionHandler.
    function httpInterceptor($log, Err, $q, $cordovaNetwork) {
        return {
            request: function (config) {
                if ($cordovaNetwork.isOffline()) {
                    $log.warn('Cancelled request because there is zero connectivity right now:', config);
                    // By throwing that error instead of returning a rejected promise, we make sure,
                    // it will be dispatched to $exceptionHandler and a caller catch block. Callers may treat
                    // it but it will always also arrive to $exceptionHandler.
                    throw new Err(1000, {ui: true});
                }
                return config;
            },
            responseError: function (response) {
                if (response.status === 0) {
                    // Timeout
                    throw new Err(1001, {ui: true});
                }
                return $q.reject(response);
            }
        };
    }

})();


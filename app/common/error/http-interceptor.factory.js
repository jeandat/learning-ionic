(function () {
    'use strict';

    angular
        .module('app')
        .factory('httpInterceptor', httpInterceptor);

    // Normalize and transform network errors.
    function httpInterceptor(Err, $q, $log) {
        return {
            requestError: function () {
                $log.debug('REQUEST ERROR:', arguments);
            },
            responseError: function (response) {
                if (response.status === -1) {
                    // Offline
                    return $q.reject(new Err(1000, {ui: true}));
                }
                if (response.status === 0) {
                    // Timeout
                    return $q.reject(new Err(1001, {ui: true}));
                }
                if (response.status === 429) {
                    return $q.reject(new Err(1003, {ui: true}));
                }
                return $q.reject(response);
            }
        };
    }

})();


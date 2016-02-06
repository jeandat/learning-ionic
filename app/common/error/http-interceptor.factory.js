(function () {
    'use strict';

    angular
        .module('app')
        .factory('httpInterceptor', httpInterceptor);

    function httpInterceptor(Err, $q) {
        return {
            responseError: function (response) {
                if (response.status === -1) {
                    // Offline
                    return $q.reject(new Err(1000, {ui: true}));
                }
                if (response.status === 0) {
                    // Timeout
                    return $q.reject(new Err(1001, {ui: true}));
                }
                return $q.reject(response);
            }
        };
    }

})();


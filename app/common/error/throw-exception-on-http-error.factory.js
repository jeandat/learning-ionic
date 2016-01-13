(function () {
    'use strict';

    // ! NOT USED FOR THE MOMENT !
    // POSSIBLE BEHAVIOR IF WE WANT TO THROW AN EXCEPTION SYSTEMATICALLY WHEN AN HTTP REQUEST FAIL.
    // I PREFER TO DELEGATE THAT RESPONSABILITY TO EACH COMPONENT BECAUSE THEY MAY WANT TO HANDLE IT DIFFERENTLY.
    // MEANING THEY MAY WANT TO BYPASS $exceptionHandler AND NOT RENDER A POPUP AND ALL…

    angular
        .module('app')
        .factory('throwExceptionOnHttpError', throwExceptionOnHttpError);

    function throwExceptionOnHttpError($log, throwErr) {
        return {
            requestError: function (config) {
                $log.debug('HTTP requestError interceptor:', config);
            },
            responseError: function (response) {
                $log.debug('HTTP responseError interceptor:', response);
                throwErr(response);
            }
        };
    }

})();


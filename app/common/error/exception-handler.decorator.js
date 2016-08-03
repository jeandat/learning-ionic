(function () {
    'use strict';

    // Override angular default error handler.

    angular
        .module('app')
        .decorator('$exceptionHandler', $exceptionHandlerDecorator);

    $exceptionHandlerDecorator.$inject = ['$delegate', '$log', 'showErr'];

    // Default angular handler for uncatched exceptions. Render a native toast.
    function $exceptionHandlerDecorator($delegate, $log, showErr) {

        function exceptionHandler(exception, cause) {
            $delegate(exception, cause);
            showErr(exception);            
        }

        // Does that thing works ?
        window.onerror = function(message, url, lineNumber, columnNumber, source){
            $log.debug('Redirected a non angular error to our angular handler');
            exceptionHandler(source, message);
        };

        return exceptionHandler;
    }

})();


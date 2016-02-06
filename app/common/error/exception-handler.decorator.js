(function () {
    'use strict';

    // Override angular default error handler.

    angular
        .module('app')
        .decorator('$exceptionHandler', $exceptionHandlerDecorator);

    $exceptionHandlerDecorator.$inject = ['$delegate', '$log', '$injector'];

    function $exceptionHandlerDecorator($delegate, $log, $injector) {

        function exceptionHandler(exception, cause) {

            $delegate(exception, cause);

            var Err = $injector.get('Err');
            var $cordovaToast = $injector.get('$cordovaToast');

            if(exception instanceof Err){
                if(exception.ui){
                    return showToast(exception.message);
                }
            }

            return showToast(new Err(1002).message);

            ///////////////

            function showToast(message){
                $cordovaToast.showLongBottom(message);
            }
        }

        // Does that thing works ?
        window.onerror = function(message, url, lineNumber, columnNumber, source){
            $log.debug('Redirected a non angular error to our angular handler');
            exceptionHandler(source, message);
        };

        return exceptionHandler;
    }

})();


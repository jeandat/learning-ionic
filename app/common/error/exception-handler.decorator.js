(function () {
    'use strict';

    // Override angular default error handler.

    angular
        .module('app')
        .decorator('$exceptionHandler', $exceptionHandlerDecorator);

    $exceptionHandlerDecorator.$inject = ['$delegate', '$log', '$injector', '$window'];

    function $exceptionHandlerDecorator($delegate, $log, $injector, $window) {

        function aldExceptionHandler(exception, cause) {

            $delegate(exception, cause);

            var $ionicPopup = $injector.get('$ionicPopup');

            var code = _.has(exception, 'code') ? exception.code : 0;
            var message = exception.message;

            $ionicPopup.show({
                title: 'Houston, we\'ve had a problem',
                subTitle: 'Error ' + code,
                template: message,
                buttons: [{
                    text: 'Close',
                    type: 'button-positive'
                },{
                    text: 'Restart',
                    type: 'button-calm',
                    onTap: restart
                }]
            });

            ////////////////////

            function restart(){
                $window.location.reload(true);
            }
        }

        // Does that thing works ?
        window.onerror = function(message, url, lineNumber, columnNumber, source){
            $log.debug('Redirected a non angular error to ald angular handler');
            aldExceptionHandler(source, message);
        };

        return aldExceptionHandler;
    }

})();


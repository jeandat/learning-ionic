(function () {
    'use strict';

    angular
        .module('app')
        .factory('showErr', factory);

    /////////

    // Dumb function that take an error and throw it.
    // Can be used in conjunction with a catch block for instance when the only think you want to do
    // is throw whatever comes in.
    function factory($injector) {
        return function showErr(exception) {
            
            var Err = $injector.get('Err');
            var $cordovaToast = $injector.get('$cordovaToast');

            if (exception instanceof Err) {
                if (exception.ui) {
                    return showToast(exception.message);
                }
            }

            return showToast(new Err(1002).message);

            ///////////////

            function showToast(message) {
                $cordovaToast.showLongBottom(message);
            }
        };
    }

})();

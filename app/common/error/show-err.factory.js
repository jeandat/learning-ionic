(function () {
    'use strict';

    angular
        .module('app')
        .factory('showErr', factory);

    /////////

    // Render a native toast for the given exception.
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

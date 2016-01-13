(function () {
    'use strict';

    // NOT USED FOR NOW.

    angular
        .module('app')
        .controller('LandingController', LandingController);

    function LandingController($log, $cordovaSplashscreen) {

        var vm = this;
        vm.title = 'LandingController';

        activate();

        ////////////////

        function activate() {
            $log.debug(vm.title + ' instantiated');
            $cordovaSplashscreen.hide();
            $log.debug('Splashscreen hidden');
        }
    }

})();


(function () {
    'use strict';

    angular
        .module('app')
        .controller('FavouritesController', FavouritesController);

    function FavouritesController($log) {

        var vm = this;
        vm.title = 'FavouritesController';

        activate();

        ////////////////

        function activate() {
            $log.debug(vm.title + ' instantiated');
        }
    }

})();

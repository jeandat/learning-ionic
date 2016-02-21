(function () {
    'use strict';

    angular
        .module('app')
        .controller('FavouriteListController', FavouriteListController);

    function FavouriteListController($log) {

        var vm = this;
        vm.title = 'FavouriteListController';

        activate();

        ////////////////

        function activate() {
            $log.debug(vm.title + ' instantiated');
        }
    }

})();

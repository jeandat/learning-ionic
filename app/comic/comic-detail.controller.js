(function () {
    'use strict';

    angular
        .module('app')
        .controller('ComicDetailController', ComicDetailController);

    function ComicDetailController($log, $stateParams) {

        var vm = this;
        vm.title = 'ComicDetailController';
        vm.comic = $stateParams.comic;

        activate();

        ////////////////

        function activate() {
            $log.debug(vm.title + ' instantiated');
        }

    }

})();


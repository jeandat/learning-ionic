(function () {
    'use strict';

    angular
        .module('app')
        .controller('CharacterComicsController', CharacterComicsController);

    function CharacterComicsController($log, $stateParams) {

        var vm = this;
        vm.title = 'CharacterComicsController';
        vm.comics = $stateParams.comics;

        activate();

        ////////////////

        function activate() {
            $log.debug(vm.title + ' instantiated');
        }

    }

})();


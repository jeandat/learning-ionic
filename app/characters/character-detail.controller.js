(function () {
    'use strict';

    angular
        .module('app')
        .controller('CharacterDetailController', CharacterDetailController);

    function CharacterDetailController($log, $stateParams) {

        var vm = this;
        vm.title = 'CharacterDetailController';
        vm.character = $stateParams.character;

        activate();

        ////////////////

        function activate() {
            $log.debug(vm.title + ' instantiated');
        }

    }

})();


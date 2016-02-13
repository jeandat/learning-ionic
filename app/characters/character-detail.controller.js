(function () {
    'use strict';

    angular
        .module('app')
        .controller('CharacterDetailController', CharacterDetailController);

    function CharacterDetailController($log, $stateParams) {

        var vm = this;
        vm.title = 'CharacterDetailController';
        vm.character = $stateParams.character;
        vm.openDetailPage = openDetailPage;

        activate();

        ////////////////

        function activate() {
            $log.debug(vm.title + ' instantiated');
            $log.debug('character:', vm.character);
        }

        function openDetailPage(){
            cordova.InAppBrowser.open(vm.character.getDetailUrl(), '_system');
        }

    }

})();


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
        }

        function openDetailPage(){
            var open = _.get(window, 'cordova.InAppBrowser.open') || window.open;
            open(vm.character.detailUrl, '_system');
        }

    }

})();


(function () {
    'use strict';

    angular
        .module('app')
        .controller('CharactersController', CharactersController);

    function CharactersController($log, charactersService, $cordovaToast, throwErr, $scope, $cordovaKeyboard) {

        var vm = this;
        vm.title = 'CharactersController';
        vm.filter = '';
        // Let's start with something cool ;)
        vm.characters = charactersService.getList({nameStartsWith:'Deadpool'}).$object;
        vm.keep = keep;
        vm.search = search;
        vm.searching = false;

        activate();

        ////////////////

        function activate() {
            $log.debug(vm.title + ' instantiated');
        }

        function keep() {
            $cordovaToast.showShortBottom('Not implemented yet…');
        }

        function search() {
            var criteria = vm.filter ? {nameStartsWith: vm.filter} : {};
            var promise = charactersService.getList(criteria);
            vm.characters = promise.$object;
            vm.searching = true;
            $cordovaKeyboard.close();
            return promise.then(log).catch(throwErr).finally(hideSpinner);

            ///////////

            function log(characters) {
                $log.debug(characters.length + ' results:', characters);
            }

            function hideSpinner(){
                vm.searching = false;
            }
        }

    }

})();

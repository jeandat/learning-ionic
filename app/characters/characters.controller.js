(function () {
    'use strict';

    angular
        .module('app')
        .controller('CharactersController', CharactersController);

    function CharactersController($log, charactersService, $cordovaToast) {

        var vm = this;
        vm.title = 'CharactersController';
        //vm.request = request;
        vm.characters = charactersService.getList().$object;
        vm.keep = keep;

        activate();

        ////////////////

        function activate() {
            $log.debug(vm.title + ' instantiated');
        }

        function keep(){
            $cordovaToast.showShortBottom('Not implemented yet…');
        }

        //function request(){
        //    charactersService.getList().then(function (characters) {
        //        $log.debug(characters.length + ' characters:', characters);
        //        $cordovaToast.showLongBottom(characters.length + ' characters in stock');
        //    }).catch(throwErr);
        //}

    }

})();

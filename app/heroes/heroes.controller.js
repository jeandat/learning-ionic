(function () {
    'use strict';

    angular
        .module('app')
        .controller('HeroesController', HeroesController);

    function HeroesController($log, heroesService, $cordovaToast, throwErr) {

        var vm = this;
        vm.title = 'HeroesController';
        vm.request = request;

        activate();

        ////////////////

        function activate() {
            $log.debug(vm.title + ' instantiated');
        }

        function request(){
            heroesService.getList({nameStartsWith: 'B'}).then(function (heroes) {
                $log.debug(heroes.length + ' heroes:', heroes);
                $cordovaToast.showLongBottom(heroes.length + ' heroes in stock');
            }).catch(throwErr);
        }

    }

})();
(function () {
    'use strict';

    angular
        .module('app')
        .controller('HeroesController', HeroesController);

    function HeroesController($log, heroesService, $cordovaToast) {

        var vm = this;
        vm.title = 'HeroesController';

        activate();

        ////////////////

        function activate(){
            $log.debug(vm.title + ' instantiated');
            heroesService.getList({nameStartsWith: 'B'}).then(function(heroes){
                $log.debug(heroes.length + ' heroess:', heroes);
                $cordovaToast.showLongBottom(heroes.length + ' heroes in stock');
            });
        }

    }

})();
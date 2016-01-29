(function () {
    'use strict';

    angular
        .module('app')
        .controller('HeroesController', HeroesController);

    function HeroesController($log, Heroes) {

        var vm = this;
        vm.title = 'HeroesController';

        activate();

        ////////////////

        function activate(){
            $log.debug(vm.title + ' instantiated');
            Heroes.getList().then(function(heroes){
                $log.debug(heroes.length + ' heroes:', heroes);
            });
        }

    }

})();
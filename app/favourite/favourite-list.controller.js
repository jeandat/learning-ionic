(function () {
    'use strict';

    angular
        .module('app')
        .controller('FavouriteListController', FavouriteListController);

    function FavouriteListController($log, favouriteService, $state) {

        var vm = this;
        vm.title = 'FavouriteListController';
        vm.faves = [];
        vm.faveKeys = [];
        vm.deleteFave = deleteFave;
        vm.navigate = navigate;

        activate();

        ////////////////

        function activate() {
            $log.debug(vm.title + ' instantiated');
            favouriteService.faves.$watch(generateIndex);
            generateIndex();
        }

        function generateIndex(){
            vm.faves = _.groupBy(favouriteService.faves, nameOrTitle);
            vm.faveKeys = _.sortBy(_.keys(vm.faves));
            //////////
            function nameOrTitle(fave) {
                return _.first(fave.name || fave.title);
            }
        }

        function deleteFave(fave) {
            favouriteService.faves.$remove(fave);
        }

        function navigate(fave) {
            if (fave.type === 'character') {
                $state.go('app.characterDetailInModal', {character: fave});
            } else {
                $state.go('app.comicDetailInModal', {comic: fave});
            }
        }
    }

})();

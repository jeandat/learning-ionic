(function () {
    'use strict';

    angular
        .module('app')
        .controller('FavouriteListController', FavouriteListController);

    function FavouriteListController($log, favouriteService, $state, $timeout) {

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

        function navigate(fave, $event) {
            // I deactivated highlight on items because I don't want to see a flickering when swiping on an item.
            // Thus when clicking an item, we need to add it our self.
            $event.currentTarget.classList.add('activated');
            if (fave.type === 'character') {
                $state.go('app.characterDetailInModal', {character: fave});
            } else {
                $state.go('app.comicDetailInModal', {comic: fave});
            }
            $timeout(removeClass, 200);
            ////////////
            function removeClass(){
                $event.currentTarget.classList.remove('activated');
            }
        }
    }

})();

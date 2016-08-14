(function () {
    'use strict';

    angular
        .module('app')
        .controller('FavouriteListController', FavouriteListController);

    function FavouriteListController($log, favouriteService, $state, $timeout, $rootScope, $scope, utils) {

        var vm = this;
        vm.title = 'FavouriteListController';
        vm.faves = [];
        vm.faveKeys = [];
        vm.loaded = false;
        vm.deleteFave = deleteFave;
        vm.navigate = navigate;

        activate();

        ////////////////

        function activate() {
            $log.debug(vm.title + ' instantiated');
            // This check is done after the view has fully entered to avoid executing anything during animations.
            $scope.$on('$ionicView.afterEnter', checkFirebaseStatus);
        }

        // Start listening to faves changes.
        function checkFirebaseStatus() {
            if (!vm.loaded && $rootScope.favouritesReady) {
                vm.loaded = true;
                favouriteService.faves.$watch(generateIndex);
                generateIndex();
            }
        }

        // Transform an array of faves into a map in order to class faves into groups (one per letter in the alphabet).
        function generateIndex() {
            utils.cacheThumbnails(favouriteService.faves).then(createIndex);
            //////////
            function createIndex(faves){
                vm.faves = _.groupBy(faves, nameOrTitle);
                vm.faveKeys = _.sortBy(_.keys(vm.faves));
            }
            function nameOrTitle(fave) {
                return _.first(fave.name || fave.title);
            }
        }

        function deleteFave(fave) {
            favouriteService.removeFave(fave);
        }

        function navigate(fave, $event) {
            var raf = ionic.DomUtil.requestAnimationFrame;
            // I deactivated highlight on items because I don't want to see a flickering when swiping on an item.
            // Thus when clicking an item, we need to add the right class ourselves.
            raf(addClass);
            $timeout(navigate, 200, false);
            ////////////
            function navigate() {
                raf(removeClass);
                raf(go);
            }

            function go() {
                if (fave.type === 'character') {
                    $state.go('app.characterDetailInModal', {character: fave});
                } else {
                    $state.go('app.comicDetailInModal', {comic: fave});
                }
            }

            function addClass() {
                $event.target.parentNode.classList.add('activated');
                $log.debug('Added activated class');
            }

            function removeClass() {
                $event.target.parentNode.classList.remove('activated');
                $log.debug('Removed activated class');
            }
        }
    }

})();

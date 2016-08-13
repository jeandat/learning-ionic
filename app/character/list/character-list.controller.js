(function () {
    'use strict';

    angular
        .module('app')
        .controller('CharacterListController', CharacterListController);

    function CharacterListController($log, characterService, $cordovaToast, throwErr, defaultPageSize, $cordovaKeyboard,
                                     favouriteService, $scope, $rootScope) {

        var vm = this;
        vm.title = 'CharacterListController';
        // Let's start with something cool ;)
        vm.filter = 'wolverine';
        vm.characters = [];
        vm.searching = false;
        vm.offset = 0;
        vm.hasMore = false;
        vm.toggleFave = toggleFave;
        vm.search = search;
        vm.showMore = showMore;

        var listeners = [];

        activate();

        ////////////////

        function activate() {
            $log.debug(vm.title + ' instantiated');
            listeners.push($rootScope.$on('fave:added', favouriteDidAdded));
            listeners.push($rootScope.$on('fave:removed', favouriteDidRemoved));
            $scope.$on('$ionicView.unloaded', stopMonitoringFavourites);
            $scope.$on('$ionicView.loaded', search);
            $rootScope.$on('favourites:ready', checkFavourites);
        }

        // Search for characters whose name starts with…
        function search() {
            showSpinner();
            var promise = characterService.findByName(vm.filter);
            vm.characters = [];
            vm.hasMore = false;
            vm.offset = 0;
            $cordovaKeyboard.close();
            return promise
                .then(updateList)
                .then(notify)
                .catch(throwErr)
                .finally(hideSpinner);

            ///////////

            function notify() {
                $cordovaToast.showShortBottom(vm.characters.meta.total + ' results');
            }
        }

        function showSpinner() {
            vm.searching = true;
        }

        function hideSpinner() {
            vm.searching = false;
        }

        // Request new items for the current search.
        function showMore() {
            showSpinner();
            vm.offset += defaultPageSize;
            return characterService.findByName(vm.filter, vm.offset)
                .then(updateList)
                .catch(throwErr)
                .finally(hideSpinner);
        }

        // Concatenate current results with new ones. Update meta infos.
        function updateList(results) {
            var meta = _.get(results, 'meta');
            $log.info('Loaded', (meta.count + meta.offset), '/', meta.total, 'characters which name starts with `' +
                vm.filter + '`');
            // Update list of characters
            vm.characters = meta.offset === 0 ? results : _.unionBy(vm.characters, results, 'id');
            // Update meta
            meta = vm.characters.meta = results.meta;
            // Update boolean to know instantly if there is more
            vm.hasMore = meta && (meta.count + meta.offset) < meta.total;
        }

        // Event handler called when clicking the fave button (heart).
        // It will add or remove a favourite in Firebase.
        function toggleFave(character) {
            if (character.favourite) {
                favouriteService.removeFave(character.favourite);
            }
            else {
                var fave = character.plain();
                fave.type = 'character';
                favouriteService.addFave(fave);
            }
        }

        // Indicate us a fave has been added in Firebase (at least locally).
        function favouriteDidAdded(event, fave) {
            // Nothing to do if there is zero characters.
            if (!vm.characters.length) return;
            var model = _.find(vm.characters, {id: fave.id});
            if (model) model.favourite = fave;
            $log.debug('Fave added:', fave);
        }

        // Indicate us a fave has been removed in Firebase (at least locally).
        function favouriteDidRemoved(event, fave) {
            var model = _.find(vm.characters, {id: fave.id});
            if (model) model.favourite = null;
            $log.debug('Fave removed:', fave);
        }

        // Remove existing event handlers.
        function stopMonitoringFavourites() {
            listeners.forEach(function (fn) {
                fn();
            });
        }

        // Get the corresponding fave in Firebase (if any) for each model.
        function checkFavourites(){
            _.forEach(vm.characters, updateFavourite);
            /////////
            function updateFavourite(character){
                character.favourite = favouriteService.getFaveByModelId(character.id);
            }
        }

    }

})();

(function () {
    'use strict';

    angular
        .module('app')
        .controller('CharacterListController', CharacterListController);

    function CharacterListController($log, characterService, $cordovaToast, throwErr, defaultOffset, $cordovaKeyboard,
                                     favouriteService, $scope, $rootScope) {

        var vm = this;
        vm.title = 'CharacterListController';
        // Let's start with something cool ;)
        vm.filter = 'Iron m';
        vm.characters = [];
        vm.searching = false;
        vm.offset = 0;
        vm.hasMoreData = false;
        vm.toggleFave = toggleFave;
        vm.search = search;
        vm.loadMore = loadMore;

        var listeners = [];
        var faves = favouriteService.faves;

        activate();

        ////////////////

        function activate() {
            $log.debug(vm.title + ' instantiated');
            listeners.push($rootScope.$on('fave:added', favouriteDidAdded));
            listeners.push($rootScope.$on('fave:removed', favouriteDidRemoved));
            $scope.$on('$ionicView.unloaded', stopMonitoringFavourites);
            $scope.$on('$ionicView.loaded', search);
        }

        function search() {
            showSpinner();
            var promise = characterService.findByName(vm.filter);
            vm.characters = [];
            vm.hasMoreData = false;
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

        function loadMore() {
            showSpinner();
            vm.offset += defaultOffset;
            return characterService.findByName(vm.filter, vm.offset)
                .then(updateList)
                .catch(throwErr)
                .finally(hideSpinner);
        }

        function updateList(results) {
            var meta = _.get(results, 'meta');
            $log.info('Loaded', (meta.count + meta.offset), '/', meta.total, 'characters which name starts with `' +
                vm.filter + '`');
            // Update list of characters
            vm.characters = meta.offset === 0 ? results : _.concat(vm.characters, results);
            // Update meta
            meta = vm.characters.meta = results.meta;
            // Update boolean to know instantly if there is more
            vm.hasMoreData = meta && (meta.count + meta.offset) < meta.total;
        }

        // Event handler called when clicking the fave button (heart).
        // It will add or remove a favourite in our local db.
        function toggleFave(character) {
            if (character.favourite) {
                faves.$remove(character.favourite);
            }
            else {
                var fave = character.plain();
                fave.type = 'character';
                faves.$add(fave);
            }
        }

        function favouriteDidAdded(event, fave) {
            // Nothing to do if there is zero characters.
            if (!vm.characters.length) return;
            var model = _.find(vm.characters, {id: fave.id});
            if (model) model.favourite = fave;
            $log.debug('Fave added:', fave);
        }

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

    }

})();

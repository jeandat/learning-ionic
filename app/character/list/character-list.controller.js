(function () {
    'use strict';

    angular
        .module('app')
        .controller('CharacterListController', CharacterListController);

    function CharacterListController($log, characterService, $cordovaToast, throwErr, defaultOffset, $cordovaKeyboard, $scope,
                                     favouriteService) {

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

        activate();

        ////////////////

        function activate() {
            $log.debug(vm.title + ' instantiated');
            $scope.$on('$ionicView.unloaded', destroyFirebaseRefs);
            search();
        }

        function search() {
            showSpinner();
            var promise = characterService.findByName(vm.filter);
            vm.characters = [];
            destroyFirebaseRefs();
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
            createFirebaseRefs();
        }

        // Event handler called when clicking the fave button (heart).
        // It will add or remove a favourite in our local db.
        function toggleFave(character) {
            var fave = character.favourite;
            if (fave.id) {
                fave.$remove();
            }
            else {
                var extract = _.pickBy(character.plain(), function (value, key) {
                    return key !== 'favourite';
                });
                extract.type = 'character';
                _.extend(fave, extract);
                fave.$save();
            }
        }

        // Remove existing firebase refs.
        function destroyFirebaseRefs() {
            _.forEach(vm.characters, function (character) {
                character.favourite.$destroy();
            });
        }

        function createFirebaseRefs() {
            _.forEach(vm.characters, function (character) {
                character.favourite = favouriteService.createRef(character.id);
            });
        }

    }

})();

(function () {
    'use strict';

    angular
        .module('app')
        .controller('CharacterListController', CharacterListController);

    function CharacterListController($log, characterListService, $cordovaToast, throwErr,
                                  defaultOffset, $cordovaKeyboard) {

        var vm = this;
        vm.title = 'CharacterListController';
        // Let's start with something cool ;)
        vm.filter = 'Deadpool';
        vm.characters = [];
        vm.searching = false;
        vm.offset = 0;
        vm.keep = keep;
        vm.search = search;
        vm.loadMore = loadMore;
        vm.hasMoreData = false;

        activate();

        ////////////////

        function activate() {
            $log.debug(vm.title + ' instantiated');
            search();
        }

        function keep() {
            $cordovaToast.showShortBottom('Not implemented yet…');
        }

        function search() {
            showSpinner();
            var promise = characterListService.findByName(vm.filter);
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

        function showSpinner(){
            vm.searching = true;
        }

        function hideSpinner(){
            vm.searching = false;
        }

        function loadMore() {
            showSpinner();
            vm.offset += defaultOffset;
            return characterListService.findByName(vm.filter, vm.offset)
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

    }

})();

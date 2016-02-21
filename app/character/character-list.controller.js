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
        vm.filter = '';
        vm.characters = [];
        vm.searching = false;
        vm.offset = 0;
        vm.keep = keep;
        vm.search = search;
        vm.loadMore = loadMore;
        vm.hasMoreData = hasMoreData;

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
            vm.characters = promise.$object;
            vm.offset = 0;
            $cordovaKeyboard.close();
            return promise
                .then(clean)
                .catch(throwErr)
                .finally(hideSpinner);

            ///////////

            function clean(results) {
                var meta = _.get(results, 'meta');
                $log.info('Loaded', meta.count, '/', meta.total, 'characters which name starts with', vm.filter);
                $cordovaToast.showShortBottom(meta.total + ' results');
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

            ///////////

            function updateList(results) {
                var meta = _.get(results, 'meta');
                $log.info('Loaded', (meta.count + meta.offset), '/', meta.total, 'characters which name starts with', vm.filter);
                vm.characters = _.concat(vm.characters, results);
                vm.characters.meta = results.meta;
            }

        }

        function hasMoreData() {
            var meta = _.get(vm, 'characters.meta');
            return meta && (meta.count + meta.offset) < meta.total;
        }


    }

})();

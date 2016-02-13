(function () {
    'use strict';

    angular
        .module('app')
        .controller('ComicsController', ComicsController);

    function ComicsController($log, comicsService, $cordovaToast, throwErr, defaultOffset,
                                  $cordovaKeyboard) {

        var vm = this;
        vm.title = 'ComicsController';
        // Let's start with something cool ;)
        vm.filter = 'Deadpool';
        vm.comics = [];
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
            var promise = comicsService.findByName(vm.filter);
            vm.comics = promise.$object;
            vm.offset = 0;
            $cordovaKeyboard.close();
            return promise
                .then(clean)
                .catch(throwErr)
                .finally(hideSpinner);

            ///////////

            function clean(results) {
                var meta = _.get(results, 'meta');
                $log.info('Loaded', meta.count, '/', meta.total, 'comics which title contains', vm.filter);
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
            return comicsService.findByName(vm.filter, vm.offset)
                .then(updateList)
                .catch(throwErr)
                .finally(hideSpinner);

            ///////////

            function updateList(results) {
                var meta = _.get(results, 'meta');
                $log.info('Loaded', (meta.count + meta.offset), '/', meta.total, 'comics which title contains', vm.filter);
                vm.comics = _.concat(vm.comics, results);
                vm.comics.meta = results.meta;
            }

        }

        function hasMoreData() {
            var meta = _.get(vm, 'comics.meta');
            return meta && (meta.count + meta.offset) < meta.total;
        }


    }

})();

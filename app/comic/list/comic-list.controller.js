(function () {
    'use strict';

    angular
        .module('app')
        .controller('ComicListController', ComicListController);

    function ComicListController($log, comicService, $cordovaToast, throwErr, defaultOffset,
                                  $cordovaKeyboard) {

        var vm = this;
        vm.title = 'ComicListController';
        // Let's start with something cool ;)
        vm.filter = 'Iron m';
        vm.comics = [];
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
            var promise = comicService.findByName(vm.filter);
            vm.comics = [];
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
                $cordovaToast.showShortBottom(vm.comics.meta.total + ' results');
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
            return comicService.findByName(vm.filter, {offset:vm.offset})
                .then(updateList)
                .catch(throwErr)
                .finally(hideSpinner);
        }

        function updateList(results) {
            var meta = _.get(results, 'meta');
            $log.info('Loaded', (meta.count + meta.offset), '/', meta.total, 'comics which title starts with `' +
                vm.filter + '`');
            // Update list of comics
            vm.comics = meta.offset === 0 ? results : _.concat(vm.comics, results);
            // Update meta
            meta = vm.comics.meta = results.meta;
            // Update boolean to know instantly if there is more
            vm.hasMoreData = meta && (meta.count + meta.offset) < meta.total;
        }

    }

})();

(function () {
    'use strict';

    angular
        .module('app')
        .controller('ComicListController', ComicListController);

    function ComicListController($log, comicService, $cordovaToast, throwErr, defaultPageSize, favouriteService, $cordovaKeyboard,
                                 $rootScope, $scope) {

        var vm = this;
        vm.title = 'ComicListController';
        // Let's start with something cool ;)
        vm.filter = 'son';
        vm.comics = [];
        vm.searching = false;
        vm.offset = 0;
        vm.hasMoreData = false;
        vm.keep = keep;
        vm.search = search;
        vm.loadMore = loadMore;
        vm.toggleFave = toggleFave;

        var listeners = [];

        activate();

        ////////////////

        function activate() {
            $log.debug(vm.title + ' instantiated');
            listeners.push($rootScope.$on('fave:added', favouriteDidAdded));
            listeners.push($rootScope.$on('fave:removed', favouriteDidRemoved));
            $scope.$on('$ionicView.unloaded', stopMonitoringFavourites);
            $scope.$on('$ionicView.loaded', search);
            $rootScope.$on('firebase:ready', checkFavourites);
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

        function showSpinner() {
            vm.searching = true;
        }

        function hideSpinner() {
            vm.searching = false;
        }

        function loadMore() {
            showSpinner();
            vm.offset += defaultPageSize;
            return comicService.findByName(vm.filter, {offset: vm.offset})
                .then(updateList)
                .catch(throwErr)
                .finally(hideSpinner);
        }

        function updateList(results) {
            var meta = _.get(results, 'meta');
            $log.info('Loaded', (meta.count + meta.offset), '/', meta.total, 'comics which title starts with `' +
                vm.filter + '`');
            // Update list of comics
            vm.comics = meta.offset === 0 ? results : _.unionBy(vm.comics, results, 'id');
            // Update meta
            meta = vm.comics.meta = results.meta;
            // Update boolean to know instantly if there is more
            vm.hasMoreData = meta && (meta.count + meta.offset) < meta.total;
        }

        // Event handler called when clicking the fave button (heart).
        // It will add or remove a favourite in our local db.
        function toggleFave(comic) {
            if (comic.favourite) {
                favouriteService.removeFave(comic.favourite);
            }
            else {
                var fave = comic.plain();
                fave.type = 'comic';
                favouriteService.addFave(fave);
            }
        }

        function favouriteDidAdded(event, fave) {
            // Nothing to do if there is zero comics.
            if (!vm.comics.length) return;
            var model = _.find(vm.comics, {id: fave.id});
            if (model) model.favourite = fave;
            $log.debug('Fave added:', fave);
        }

        function favouriteDidRemoved(event, fave) {
            var model = _.find(vm.comics, {id: fave.id});
            if (model) model.favourite = null;
            $log.debug('Fave removed:', fave);
        }

        // Remove existing event handlers.
        function stopMonitoringFavourites() {
            listeners.forEach(function (fn) {
                fn();
            });
        }

        function checkFavourites(){
            _.forEach(vm.comics, updateFavourite);
            /////////
            function updateFavourite(comic){
                comic.favourite = favouriteService.getFaveByModelId(comic.id);
            }
        }

    }

})();

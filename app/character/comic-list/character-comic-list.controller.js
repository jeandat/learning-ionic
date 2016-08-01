(function () {
    'use strict';

    angular
        .module('app')
        .controller('CharacterComicListController', CharacterComicListController);

    function CharacterComicListController($log, $stateParams, comicService, $scope, throwErr) {

        var vm = this;
        vm.title = 'CharacterComicListController';
        vm.comics = [];
        vm.character = {};
        vm.hasMore = true;
        vm.spinnerVisible = false;
        vm.showMore = showMore;
        vm.remove = remove;

        var unlisten;

        activate();

        ////////////////

        function activate() {
            $log.debug(vm.title + ' instantiated');
            vm.comics = $stateParams.comics;
            vm.character = $stateParams.character;
            unlisten = $scope.$parent.$on('modal.shown', showMore);
        }

        function showMore() {
            if (unlisten) {
                unlisten();
                // One time only. First time, I don't want to use immediate-check because it would impact the performance of the opening
                // animation. I prefer to trigger a load and show the spinner manually. Next times, ion-infinite-scroll will do its job
                // normally when bounds have been reached.
                vm.spinnerVisible = true;
            }
            $log.debug('Infinite scroll boundary reached');
            comicService
                .findByCharacterId(vm.character.id, {offset: vm.comics.length})
                .then(updateList)
                .catch(throwErr);

            /////////////

            function updateList(results) {
                vm.spinnerVisible = false;
                var meta = _.get(results, 'meta');
                $log.info('Loaded', (meta.count + meta.offset), '/', meta.total, 'comics');
                // Update list of characters
                vm.comics = _.concat(vm.comics, results);
                // Update meta
                vm.comics.meta = meta;
                // Update boolean to know instantly if there is more
                vm.hasMore = meta && (meta.count + meta.offset) < meta.total;
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }
        }

        function remove() {
            // Little subtlety.
            // For simplicity sake, the modal load a template which define its own controller in the template (this one).
            // As ionicModal create a scope automatically if not provided, it is automatically the parent of the one created for this controller.
            // You should know too that ionicModal will register the created instance as a property of the scope.
            // Thus our parent scope possessing a reference to our modal instance.
            $scope.$parent.modal.remove();
        }
    }

})();

